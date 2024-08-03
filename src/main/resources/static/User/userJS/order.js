myapp.controller("ctrlcart",function($scope,$http){
    $scope.detail = [];
    $scope.orderdetail = [];
    $scope.itemcart={};
    $scope.form={};
    $scope.info={
        numberphone:"",
        adress:""

    };
    $scope.viewItems ={
     views(){
            var user=$("#usernameCart").text(); 
            $http.get(`http://localhost:8080/CartItem/cartItems/${user}`).then(resitem => {
                $scope.itemcart = resitem.data;
                    $http.get(`http://localhost:8080/CartItem/cartItemDetail/${$scope.itemcart.cartID}`).then(rescartDetail=>{
                         $scope.detail = rescartDetail.data;
                         
                         $scope.getTotal = function(){
                         var total = 0;
                         for(var i = 0; i < $scope.detail.length; i++){
                           var product = $scope.detail[i];
                            total += (product.realPrice * product.quantity);
                             }
                            return total;
                }
                 
             });

            });
     },
     update(cartDetailID){
            var user=$("#usernameCart").text();
            var number = document.getElementById(cartDetailID).value;
            $http.get(`http://localhost:8080/CartItem/cartItems/${user}`).then(resitem => {
                 $scope.itemcart = resitem.data;
                 console.log($scope.itemcart);
             
                 $http.get(`http://localhost:8080/CartItem/cartItemDetail/${$scope.itemcart.cartID}/${cartDetailID}`).then(rescartDetail=>{
                     $scope.form = rescartDetail.data;
                     console.log($scope.form);
                     var data = {
                         cartDetailID:cartDetailID,
                         cartItems: $scope.itemcart,
                         products:  $scope.form.products,
                         quantity: number,
                         realPrice:  $scope.form.realPrice,
                    }
                     var url = `http://localhost:8080/CartItem/cartItemDetail/${cartDetailID}`;
                     $http.put(url,data).then(resp=>{
                         $scope.viewItems.views();
                     }).catch(error => {
                     });
                 });
            });
     },
     addOrder(){
    //check loi
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/;
        var mobile = $scope.info.numberphone;
        if($scope.info.adress.length <9 ){
            return Swal.fire(
                 'Error',
                 'Điền đúng địa chỉ để có thể nhận hàng nhanh hơn nhé :)',
                 'error'
            )
        }
        if(vnf_regex.test(mobile) == false){
            return Swal.fire(
                 'Error',
                 'Nhập đúng SDT để mình gọi chốt đơn nhé :)',
                 'error'
               )
        }
        if($scope.info.adress.length >=9 || vnf_regex.test(mobile) == true){
            var user=$("#usernameCart").text();
            //cart items
            $http.get(`http://localhost:8080/CartItem/cartItems/${user}`).then(resitem => {
                $scope.itemcart = resitem.data;
            //cart itemdetail
                $http.get(`http://localhost:8080/CartItem/cartItemDetail/${$scope.itemcart.cartID}`).then(rescartDetail=>{
                    $scope.orderdetail = rescartDetail.data;
                     //tongtien
                    $scope.getTotal = function(){
                        var total = 0;
                        for(var i = 0; i < $scope.orderdetail.length; i++){
                            var product = $scope.orderdetail[i];
                            total += (product.realPrice * product.quantity);
                        }
                        return total;
                    }
                        //lay account
                    $http.get(`http://localhost:8080/restAccount/accounts/${user}`).then(resaccout => {
                        $scope.acc = resaccout.data;
                                  //post vao oder
                        var dataOder = {
                            orderID: 0,
                            amount:  $scope.getTotal(),
                            adress: $scope.info.adress,
                            orderDate: new Date(),
                            phone:$scope.info.numberphone,
                            status: 1,
                            accountoder: $scope.acc
                            }
                        $http.post(`http://localhost:8080/order/Order/`,dataOder).then(resOder=>{
                            Swal.fire(
                                'Đặt Hàng Thành Công',
                                'Cảm ơn bạn đã tin tưởng Shop T-MART :)',
                                'success'
                            )                  
                            $scope.infoOrder = resOder.data;
                            console.log($scope.infoOrder);
                            var dataallDetail =[]
                            for(var i = 0; i<$scope.orderdetail.length; i++){
                                var product = $scope.orderdetail[i];
                                var  dataDetail ={
                                    orderDetailID: 0,
                                    quantity: product.quantity,
                                    unitPrice:(product.realPrice * product.quantity),
                                    orders:resOder.data,
                                    productOrder: $scope.orderdetail[i].products,
                                }
                                dataallDetail.push(dataDetail)               
                            } 
                            $http.post(`http://localhost:8080/orderDetail/OrderDetailUser`,dataallDetail).then(resOderDetail=>{
                                var  datasend = resOder.data;
                                console.log(datasend)
                                $http.post(`http://localhost:8080/send/orders`,datasend).then(ressendOder=>{
                                    console.log(ressendOder)
                                }).catch(error => {
                                    console.log(error);
                                    alert("that bai");
                                });                    
                                                                
                            }).catch(error => {
                                console.log(error);
                            });
                            for(var i = 0; i<$scope.orderdetail.length; i++){
                                $scope.delete($scope.orderdetail[i].cartDetailID)
                            }
                              
                            $scope.viewItems.views();
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                });
            });
        }
     }
    }
    $scope.delete = function(cartDetailID){
            var url = `http://localhost:8080/CartItem/cartItemDetail/${cartDetailID}`;
            $http.delete(url).then(resp =>{
                var index= $scope.detail.findIndex(item => item.cartDetailID == cartDetailID);
                $scope.detail.splice(index, 1);
                $scope.viewItems.views();
            }).catch(error =>  Swal.fire(
                'Error',
                'Xin lỗi, Brand này đang được sử dụng :)',
                'error'
            ));
    }
    $scope.pagecartItem = {
            page: 0,
            size: 3,
            get items(){
                var start = this.page * this.size;
                return $scope.detail.slice(start, start + this.size);
            },
            get count(){
                return Math.ceil(1.0 * $scope.detail.length/this.size);
            },
            first(){
                this.page = 0;
            },
            prev(){
                this.page--;
                if(this.page<0){
                    this.last();
                }
            },
            next(){
                this.page++;
                if(this.page >= this.count){
                    this.first();
                }
            },
            last(){
                this.page = this.count - 1 ;
            }
}
    
        $scope.viewItems.views();
});

myapp.controller("ctrloder",function($scope,$http){
    $scope.orderdetail = [];
//xem order dang dat voi moi account
        $scope.viewOrderingByUsername = function(){
     
            var user=$("#username").text();
            console.log(user);
            $http.get(`http://localhost:8080/order/Orders/${user}`).then(resitem => {
                $scope.order = resitem.data;
             console.log($scope.order);
  
            });
            
        }
//xem order da dat voi moi account
        $scope.viewOrderedByUsername = function(){
     
            var user=$("#username").text();
            console.log(user);
            $http.get(`http://localhost:8080/order/Ordered/${user}`).then(resitem => {
                $scope.order = resitem.data;
             console.log($scope.order);
  
            });
            
        }
//da nhan
        $scope.danhan = function(orderid){
            Swal.fire({
                title: 'T-MART',
                text: 'Bạn đã nhận được hàng rồi ư :)',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Vâng, Tôi nhận được rồi!',
                cancelButtonText: 'Không, Tôi nhầm!'
              }).then((result) => {
                if (result.isConfirmed) {
                  //-----------------------------------------
                  $http.get(`http://localhost:8080/statistical/confirm/${orderid}`).then(resp => {
                    $scope.danhan = resp.data;
                    var items = $scope.danhan;
                    items.status = 4;
                    console.log(items);
                    
                    $http.put(`http://localhost:8080/statistical/confirm/${orderid}`,items).then(respa=>{
                        Swal.fire("Hệ Thống", "Cám ơn bạn đã tin tưởng T-MART, Chúc bạn một ngày tốt lành!", "success");
                       $http.post(`http://localhost:8080/send/orders`,items).then(ressendOder=>{
                            console.log(ressendOder)
                           
                       }).catch(error => {
                        
                        alert("that bai");
                       });   
                       
                       $scope.viewOrderedByUsername();
                       $scope.viewOrderingByUsername();
                   }).catch(error => Swal.fire(
                   'Error',
                   'Xác nhận rùi mà :(',
                   'error'
                   ));
                 
                }).catch(error => console.log("Error",error));
                
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire(
                    'T-MART',
                    'Lần sau cẩn thận hơn nhé :)',
                    'error'
                  )
                }
              })


       
        
        }
//huy don
        $scope.huydon = function(orderid){
            Swal.fire({
                title: 'T-MART',
                text: 'Bạn muốn hủy đơn bây giờ ư :(',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Vâng, Tôi muốn hủy đơn!',
                cancelButtonText: 'Không, Tôi nhầm!'
              }).then((result) => {
                if (result.isConfirmed) {
                  //-----------------------------------------
                  $http.get(`http://localhost:8080/statistical/confirm/${orderid}`).then(resp => {
                    $scope.form = resp.data;
                    var item = $scope.form;
                    item.status = 3;
                    console.log(item);
                    
                    $http.put(`http://localhost:8080/statistical/confirm/${orderid}`,item).then(resp=>{
                       Swal.fire("Hệ Thống", "Đơn Hàng đã được hủy!", "success");
                       $http.post(`http://localhost:8080/send/orders`,item).then(ressendOder=>{
                       console.log(ressendOder)
                       }).catch(error => {
                            console.log(error);
                            alert("that bai");
                       });   
                       $scope.viewOrderedByUsername();
                       $scope.viewOrderingByUsername();
                    }).catch(error => Swal.fire(
                        'Error',
                        'Xác nhận rùi mà :(',
                        'error'
                    ));
                 
                }).catch(error => console.log("Error",error));
                
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire(
                    'T-MART',
                    'Lần sau cẩn thận hơn nhé :)',
                    'error'
                  )
                }
              })
           
        
        }
//xem orderdetail voi moi account va order
        $scope.viewOrderdetailbyOrderAndUsername = function(orderid){
     
            var user=$("#username").text();
            console.log(user);
            $http.get(`http://localhost:8080/orderDetail/ListDetail/${orderid}/${user}`).then(resitem => {
                $scope.orderdetailbyOrderAndUsername = resitem.data;
                console.log($scope.orderdetailbyOrderAndUsername);    
            });   
        }
//phan trang detail
        $scope.pageDetail = {
            page: 0,
            size: 3,
            get items(){
                var start = this.page * this.size;
                return $scope.orderdetailbyOrderAndUsername.slice(start, start + this.size);
            },
             get count(){
                return Math.ceil(1.0 * $scope.orderdetailbyOrderAndUsername.length/this.size);
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
//phan trang order
        $scope.pageOrder = {
            page: 0,
            size: 3,
            get items(){
                var start = this.page * this.size;
                return $scope.order.slice(start, start + this.size);
            },
            get count(){
                return Math.ceil(1.0 * $scope.order.length/this.size);
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
        
        $scope.viewOrderingByUsername();
});
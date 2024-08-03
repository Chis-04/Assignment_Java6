var myapp = angular.module("app", []);
let hostHome = "http://localhost:8080/restProduct/products";
myapp.controller("ctrlHome",function($scope,$http){
    $scope.items = [];
    $scope.itemcate = [];
    $scope.show = {};
            $scope.load_all = function(){
                 $http.get(`${hostHome}`).then(resp => {
                     $scope.items = resp.data;
                     $scope.items.forEach(item => {
                     item.enteredDate = new Date(item.enteredDate)
                  });
                 });
                }
 
            $scope.getAmount = function(unitPrice,discount){
              return unitPrice * ((100-discount)/100)
            }
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
             }
             }) 

             $scope.views = function(productID){
              var url= `${hostHome}/${productID}`;
              $http.get(url).then(resp => {
        
              $scope.show = resp.data;

             }).catch(error => console.log("Error",error));
            }

            $scope.loadcate = function(){
                var url = `http://localhost:8080/categoryRest/categories`
            
                $http.get(url).then(resp => {
                    $scope.itemcate = resp.data;
                  
                }).catch(error =>{
                  
                });
        
            }

            $scope.productincate = function(categoryID){
                var url = `http://localhost:8080/restProduct/category/${categoryID}`
            
                $http.get(url).then(resp => {
                    $scope.items = resp.data;
                   
                }).catch(error =>{
                   
                });
        
            }
            
            $scope.cart = {

                 add(productID){
                 //cart items
                var user = $("#username").text();
                var urlcartitems = "http://localhost:8080/CartItem/cartItems";
                $http.get(`${urlcartitems}/${user}`).then(resitem => {
                $scope.itemcart = resitem.data;
                console.log($scope.itemcart);
                //prodcut
                var urlproduct= `${hostHome}/${productID}`;

                $http.get(urlproduct).then(resproduct => {
          
                    $scope.product = resproduct.data;
                    console.log($scope.product);
//cart
                var urlpost = `http://localhost:8080/CartItem/cartItemDetail`;
                var data = {
                  cartDetailID:0,
                  quantity: 1,
                  realPrice: $scope.getAmount($scope.product.unitPrice,$scope.product.discount),
                  products:  $scope.product,
                  cartItems: $scope.itemcart
                }
                  console.log(data)
                  var check =false;
                  $http.get(`http://localhost:8080/CartItem/cartItemDetail/${data.cartItems.cartID}`).then(resitem => {
                         $scope.checkProduct = resitem.data;
                         for(var i =0; i<$scope.checkProduct.length; i++){
                         console.log($scope.checkProduct[i].products);
                         if($scope.product.productID == $scope.checkProduct[i].products.productID){
                         check =true;
                        }
                     }
                  if(check ==true){
                     Toast.fire({
                      icon: 'warning',
                     title: 'Sản phẩm: ' + $scope.product.name +' đã có trong giỏ hàng của bạn!',
                     })
                }
                  else{
                     $http.post(urlpost,data).then(function(res){
                         Toast.fire({
                             icon: 'success',
                             title: 'Đã thêm sản phẩm ' + $scope.product.name,
                         })
                         console.log($scope.product);
                      
                    },function(error){
                      Swal.fire(
                          'Error',
                          'Thêm thất bại, Bạn hãy điền đúng thông tin nhé :(',
                          'error'
                        )
                      })
                    }
                 })
             });
         });
    }
}
            $scope.page = {
             page: 0,
             size: 8,
             get items(){
                var start = this.page * this.size;
                 return $scope.items.slice(start, start + this.size);
             },
             get count(){
                return Math.ceil(1.0 * $scope.items.length/this.size);
            },
             loadmore(){
                 this.size += 4;
                 $scope.load_all();
             }
            }
     $scope.loadcate();
     $scope.load_all();
});
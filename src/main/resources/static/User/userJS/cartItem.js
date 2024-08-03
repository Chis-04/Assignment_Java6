
myapp.controller("ctrlcartDetail",function($scope,$http){
    $scope.detail = [];
    $scope.items = [];
    $scope.itemcart={};
    $scope.price = {};

    //logout
             $scope.logout = function(){
               Swal.fire({
                 position: 'top-end',
                 title: ' <br>Bạn Muốn Đăng Xuất?<br><br> <a class="btn btn-primary" href="/auth/logoff"> Đăng Xuất</a>',
                  showConfirmButton: false,
              })
             }
    //hien thi cac item da them vao
             $scope.viewItems = function(){
     
               var user=$("#usernameCart").text();
            
                $http.get(`http://localhost:8080/CartItem/cartItems/${user}`).then(resitem => {
                   $scope.itemcart = resitem.data;
                   console.log($scope.itemcart);
             
                $http.get(`http://localhost:8080/CartItem/cartItemDetail/${$scope.itemcart.cartID}`).then(rescartDetail=>{
                   $scope.detail = rescartDetail.data;
    
                });
                });
             }
    //xoa cartitem
             $scope.delete = function(cartDetailID){
              var url = `http://localhost:8080/CartItem/cartItemDetail/${cartDetailID}`;
                  $http.delete(url).then(resp =>{
                    var index= $scope.detail.findIndex(item => item.cartDetailID == cartDetailID);
                    $scope.detail.splice(index, 1);
                    $scope.viewItems();
                }).catch(error =>  Swal.fire(
                    'Error',
                    'Xin lỗi, Brand này đang được sử dụng :)',
                    'error'
                  ));
            }
    //phan trang cho cartitem
            $scope.pagecart = {
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
    //cap nhat anh
            $scope.uploadImages = function (){
               const ref = firebase.storage().ref();
               const file = document.querySelector('#photo').files[0];
               const metadata ={
                contentType: file.type
               };
           
               const name = file.name;
               const uploadIMG = ref.child(name).put(file,metadata);
                   uploadIMG
               .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {console.log(url);
                   Swal.fire({
                    title: 'Upload thành công',
                    text: '',
                    imageUrl: url,
                    imageWidth: 400,
                    imageHeight: 400,
                    imageAlt: 'Custom image',
                })
            }
            ).catch(
                Swal.fire({
                  title: 'Đang tải ảnh!',
                  html: 'I will close in <b></b> milliseconds.',
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: () => {
                    let timerInterval;
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                      const content = Swal.getHtmlContainer()
                      if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = Swal.getTimerLeft()
                        }
                      }
                    }, 100)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  }
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                  }
                })
            );
            }
            $scope.edit = function(){
               var user=$("#useredit").text();
               var url= `http://localhost:8080/restAccount/accountss/${user}`;
               $http.get(url).then(resp => {
                  $scope.form = resp.data;
                  $scope.names = resp.data.name;
               }).catch(error => console.log("Error",error));
            }
    //doi mat khau
            $scope.changepass = function(){
              var item = angular.copy($scope.form);
              var pass=$("#oldpass").text();
              
              if(angular.equals ($scope.change.password, pass) && angular.equals ($scope.change.newpassword, $scope.change.confirmpassword) && $scope.change.newpassword.length >=6){
                var url = `http://localhost:8080/restAccount/accounts/${item.email}`;
                item.password = $scope.change.confirmpassword;
                $http.put(url,item).then(resp=>{
                    Toast.fire({
                     icon: 'success',
                     title: 'Cập Nhật thành công'
                    })
                    var index = $scope.items.findIndex(item => item.email == $scope.form.email);
                    $scope.items[index] = resp.data;
                    $scope.edit();
               }).catch(error => {
                
               });
              }
              else if(!angular.equals ($scope.change.password, pass)){
                Toast.fire({
                  icon: 'error',
                  title: 'Bạn nhập mật khẩu cũ không đúng'
                })
              }
              else if($scope.change.newpassword.length <6){
                Toast.fire({
                  icon: 'warning',
                  title: 'Hãy chọn mật khẩu có 6 kí tự trở lên!'
                })
              }
              else {
                Toast.fire({
                  icon: 'error',
                  title: 'Xác nhận mật khẩu thất bại'
                })
              }
            }
    //tuy bien sweetalert
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
     //       
            $scope.imageChangeInfoUser = function(files){
                var data = new FormData();
                data.append('file',files[0]);
                $http.post(`http://localhost:8080/rest/upload/imageAccount`,data,{
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(res => {
                    $scope.form.photo = res.data.name;
                }).catch(error => {
                    Swal.fire(
                        'Error',
                        'Bạn đã gặp lỗi khi upload ảnh :(',
                        'error'
                      )
                });
                
            }
     //update thong tin
            $scope.update = function(){
        var item = angular.copy($scope.form);
        var name = document.getElementById("photo").value.split('\\').pop();

        item.photo = name;
        var url = `http://localhost:8080/restAccount/accounts/${$scope.form.email}`;
           $http.put(url,item).then(resp=>{
            Toast.fire({
                icon: 'success',
                title: 'Cập Nhật thành công'
              })
               var index = $scope.items.findIndex(item => item.email == $scope.form.email);
               $scope.items[index] = resp.data;
               $scope.edit();
          }).catch(error => {
           
          });

       
           }
});
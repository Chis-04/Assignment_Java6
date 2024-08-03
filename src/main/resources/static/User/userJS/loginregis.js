
var myapp = angular.module("appLogin", []);
let hostAccounts = "http://localhost:8080/restAccount";
myapp.controller("ctrlLogin",function($scope, $http,$timeout){
    $scope.items = [];
    $scope.accrole = [];
    $scope.formregis = {};
    $scope.view = {};
    $scope.loginform = {};

    //dem thoi gian xoa session
    $scope.counter = 60;
    $scope.onTimeout = function(){
        $scope.counter--;
        var mytimeout = $timeout($scope.onTimeout,1000);
        if($scope.counter == 0){
            $timeout.cancel(mytimeout);
            $scope.counter ="Mã OTP đã hết hiệu lực";
            $http.get(`http://localhost:8080/send/removeSession`).then(resp => {
            });
        }
    }

    $scope.load_all = function(){
        //account
        $http.get(`${hostAccounts}/accounts`).then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.registerDate = new Date(item.registerDate)
            });
        });
        //Role
        var url = `${hostAccounts}/Role/USER`;
        $http.get(url).then(resp => {
            $scope.roles = resp.data;
        });
    }
    //gui mail xac nhan dang ki
    $scope.checkOTP = function(){
        $http.get(`http://localhost:8080/send/maotp`).then(resp => {
            $scope.showOTP = resp.data;
            if($scope.OTP == resp.data){
                 $scope.create();
            }
            else{
                 Swal.fire(
                    'Error',
                    'Sai Mã OTP',
                    'error'
                )
            }
        }).catch(error => Swal.fire(
              'Error',
              'Đăng kí thất bại',
              'error'
            ));
    }
    //rest form otp
    $scope.resetotp = function(){
        $scope.otp = {

        }
    }
    //doi mat khau
    $scope.forgot = function(){
        $http.get(`http://localhost:8080/send/maotpforgot`).then(resp => {
              $scope.showOTPForgot = resp.data;
              if($scope.otp.OTPForgot == resp.data && angular.equals($scope.otp.newPassForgot, $scope.otp.confirmPassForgot) && $scope.otp.newPassForgot.length >=6){
                var url = `${hostAccounts}/accounts/${$scope.otp.emailForgot}`;
                $http.get(url).then(respacc => {
                    var item = respacc.data;
                    item.password = $scope.otp.confirmPassForgot;
                    $http.put(url,item).then(respoke=>{
                       Swal.fire("Hệ Thống", "Bạn đã đổi mật khẩu", "success");
                       var index = $scope.items.findIndex(item => item.email == $scope.otp.emailForgot);
                       $scope.items[index] = respoke.data;
                       $scope.counter = 1;
                    }).catch(error => Swal.fire(
                         'Hệ Thống',
                         'Cập nhật thất bại, Không cập nhật được Username :(',
                         'error'
                    ));
                })
              }
               else if(!angular.equals($scope.otp.newPassForgot, $scope.otp.confirmPassForgot)){
                Swal.fire(
                    'Hệ Thống',
                    'Xác Nhận Mật Khẩu Thất Bại',
                    'warning'
                )
               }
              else if($scope.otp.newPassForgot.length <6){
                Swal.fire(
                    'Hệ Thống',
                    'Hãy sử dụng mật khẩu từ 6 kí tự trở lên',
                    'warning'
                )
              }
              else {
                 Swal.fire(
                     'Hệ Thống',
                     'Sai Mã OTP',
                     'error'
                 )
              }
        }).catch(error => Swal.fire(
            'Error',
            'Không Có Mã OTP',
            'error'
        ));
    }
    //tuy bien sweetalert
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
             toast.addEventListener('mouseenter', Swal.stopTimer)
             toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }) 
    //gui mail xac nhan otp
    $scope.sendMail = function(){
        Toast.fire({
            icon: 'success',
            title: 'T-MART Đang gửi mã OTP về Gmail của bạn',
        })
        var  data ={
              to : $scope.formregis.email,
              subject : "T-MART xin chào quý khách",
              body : "day la body"
        }
        $http.post(`http://localhost:8080/send/otptest`,data).then(resp => {
             Swal.fire(
                'T-MART',
                'Quý Khác xin vui lòng xác nhận Gmail!!',
                'success'
            )
             $scope.onTimeout();
        }).catch(error => Swal.fire(
                 'Error',
                 'Gmail này đã được đăng kí!!',
                 'error'
        ));
    }
    //gui mail xac nhan otp forgot
    $scope.sendMailForgot = function(){
        var vnf_regex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,6}$/;
           if(vnf_regex.test($scope.otp.emailForgot)){
            Toast.fire({
                icon: 'success',
               title: 'T-MART Đang gửi mã OTP về Gmail của bạn',
               })
            var  data ={
                to : $scope.otp.emailForgot,
                 subject : "T-MART gửi cho bạn",
                  body : "day la body"
            }
        
            $http.post(`http://localhost:8080/send/otp-forgot`,data).then(resp => {
             
            Swal.fire(
                'T-MART',
                'Quý Khác xin vui lòng xác nhận Gmail!!',
                'success'
              )
              $scope.onTimeout();
            }).catch(error => Swal.fire(
                'Error',
                'Gmail này chưa được đăng kí!!',
                'error'
              ));
           }
           else{
            Swal.fire(
                'Hệ Thống',
                'Nhập đúng gmail để T-MART có thể gửi mã OTP cho bạn',
                'error'
              )
           }
      
    }
    //---------------------------------------------------------------
    $scope.create = function(){
        var url = `${hostAccounts}/accounts`;
        var data = angular.copy($scope.formregis);
        if($scope.formregis.name.length <2 ){
            Swal.fire(
                'Error',
                'Đăng kí thất bại!!, Bạn hãy điền đúng thông tin nhé :(' ,
                'error'
            )
        }
        else{
            $http.post(url,data).then(function(res){
            Swal.fire("Good job!", "Đăng kí thành công!!", "success");
            $scope.OTP = "";
            $scope.counter = 1;
            res.data.registerDate = new Date(res.data.registerDate);
            // account role
            var itemrole = {
                id: 0,
                account: res.data,
                role: $scope.roles,
            }
            $http.post(`${hostAccounts}/accountRole`,itemrole).then(function(resp){

            },function(error){
                Swal.fire(
                    'Error',
                    'Đăng kí thất bại!!, Bạn hãy điền đúng thông tin nhé :(' ,
                    'error'
                )   
            })
            // cartitem
            var itemcart = {
              cartID: 0,
              accountCart: res.data,
              amount: 0
            }
            console.log(itemcart);
            $http.post(`http://localhost:8080/CartItem/cartItems`,itemcart).then(function(resp){

            },function(error){
                 Swal.fire(
                     'Error',
                     'cartitem that bai' ,
                     'error'
                )
            });
            $scope.reset();
            $scope.load_all();
            },function(error){
                Swal.fire(
                    'Error',
                    'Thêm thất bại, Bạn hãy điền đúng thông tin nhé :(' ,
                    'error'
                  )
            })
        } 
    }
    //reset---------------------------------------------------------------
    $scope.reset = function(){
        $scope.formregis = {
            registerDate : new Date(),
            photo: "",
            name:""
        };
    }
    $scope.load_all();
    $scope.reset();
});
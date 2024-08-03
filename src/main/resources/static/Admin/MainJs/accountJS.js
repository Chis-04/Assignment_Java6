let hostAccount = "http://localhost:8080/restAccount";
app.controller("ctrlAdmin",function($scope, $http){
    $scope.items = [];
    $scope.accrole = [];
    $scope.form = {};
    $scope.view = {};
    $scope.load_all = function(){

        //account
        $http.get(`${hostAccount}/accounts`).then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.registerDate = new Date(item.registerDate)
            });
        });
        //Role
        var url = `${hostAccount}/Role/USER`;
        $http.get(url).then(resp => {
            $scope.roles = resp.data;
        });
       
    }
    //---------------------------------------------------------------
   
    $scope.imageChangeAccount = function(files){
        var data = new FormData();
        data.append('file',files[0]);
        $http.post(`http://localhost:8080/rest/upload/imageAccount`,data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(res => {
            $scope.imageAccounts = res.data.name;
        }).catch(error => {
            Swal.fire(
                'Error',
                'Bạn đã gặp lỗi khi upload ảnh :(',
                'error'
              )
        });
        
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
   $scope.uploadImageAccount = function (){
        const ref = firebase.storage().ref();
        const files = document.querySelector('#photo').files[0];
        const metadata ={
            contentType: files.type
        };
       
        const name = files.name;
        const uploadIMG = ref.child(name).put(files,metadata);
        uploadIMG
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {console.log(url);
            Toast.fire({
                icon: 'success',
                title: 'Upload Thành Công',
              })
        }
        )
        .catch(
        Toast.fire({
            icon: 'warning',
            title: 'Đang upload ảnh',
          }));

    
    }
    //---------------------------------------------------------------
    $scope.create = function(){
        var url = `${hostAccount}/accounts`;
        var data = angular.copy($scope.form);
        var name = document.getElementById("photo").value.split('\\').pop();
        data.photo = name;
            $http.post(url,data).then(function(res){
                Swal.fire("Good job!", "Đã thêm thành công Account: "+data.name, "success");
                res.data.registerDate = new Date(res.data.registerDate);

                var itemrole = {
                    id: 0,
                    account: res.data,
                    role: $scope.roles,
                }
                console.log(itemrole);
                $http.post(`${hostAccount}/accountRole`,itemrole).then(function(resp){
                    console.log(resp.data)
                    $scope.reset();
                    $scope.load_all();
                },function(error){
                    
                    Swal.fire(
                        'Error',
                        'Thêm thất bại, Bạn hãy điền đúng thông tin nhé :(' ,
                        'error'
                      )
    
                }
                )
            },function(error){
                
                Swal.fire(
                    'Error',
                    'Thêm thất bại, Bạn hãy điền đúng thông tin nhé :(' ,
                    'error'
                  )
            }
            )
           
           
          
        
        
    }
    //---------------------------------------------------------------
    $scope.reset = function(){
        $scope.form = {
            registerDate : new Date(),
            photo: "",
        };
            }
    //---------------------------------------------------------------
    $scope.update = function(){
        var item = angular.copy($scope.form);
        var name = document.getElementById("photo").value.split('\\').pop();
        item.photo = name;
        var url = `${hostAccount}/accounts/${$scope.form.email}`;
           $http.put(url,item).then(resp=>{
               Swal.fire("Good job!", "Đã cập nhật thành công ", "success");
               var index = $scope.items.findIndex(item => item.email == $scope.form.email);
               $scope.items[index] = resp.data;
               $scope.reset();
              $scope.load_all();
          }).catch(error => Swal.fire(
           'Error',
           'Cập nhật thất bại, Không cập nhật được Username :(',
           'error'
         ));

       
           }
    //---------------------------------------------------------------

    $scope.edit = function(email){
        var url= `${hostAccount}/accounts/${email}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;

        }).catch(error => console.log("Error",error));
            }
    //---------------------------------------------------------------
    $scope.delete = function(email){
        var url = `${hostAccount}/accounts/${email}`;
        Swal.fire({
            title: 'Xóa',
            text: 'Bạn chắc chắn muốn xóa chứ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Vâng, Tôi muốn xóa nó!',
            cancelButtonText: 'Không, Tôi nhầm!'
          }).then((result) => {
            if (result.isConfirmed) {
              
              $http.delete(url).then(resp =>{
                var index= $scope.items.findIndex(item => item.email == email);
                $scope.items.splice(index, 1);
                $scope.reset();
                Swal.fire(
                    'Deleted!',
                    'Xóa Thành Công!',
                    'success'
                  )
               
            }).catch(error => Swal.fire(
                'Error',
                'Xin lỗi, đang được sử dụng :)',
                'error'
              ));
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Lần sau cẩn thận hơn nhé :)',
                'error'
              )
            }
          })
       
         
    }
    //---------------------------------------------------------------
    $scope.views = function(usern){
        var url= `${hostAccount}/accounts/${usern}`;
        $http.get(url).then(resp => {
            $scope.view = resp.data;
        }).catch(error => console.log("Error",error));
        
            }
    //---------------------------------------------------------------
 
    $scope.pageac = {
        page: 0,
        size: 5,
        get items(){
            var start = this.page * this.size;
            return $scope.items.slice(start, start + this.size);
        },
        get count(){
            return Math.ceil(1.0 * $scope.items.length/this.size);
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
        //---------------------------------------------------------------
        $scope.load_all();
        $scope.reset();
});
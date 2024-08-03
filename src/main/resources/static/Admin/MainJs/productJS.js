let hostProduct = "http://localhost:8080/restProduct/products";
app.controller("ctrlProduct",function($scope,$http){
    $scope.items = [];
    $scope.cates = [];
    $scope.brands = [];
    $scope.form = {};
    $scope.view = {};
    //---------------------------------------------------------------
    $scope.load_all = function(){

        //product
        $http.get(`${hostProduct}`).then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.enteredDate = new Date(item.enteredDate)
            });
        });
        //category
        var url = `${hostCate}`;
        $http.get(url).then(resp => {
            $scope.cates = resp.data;
        });
        //brand
        var urlbrand = `${hostbrand}`;
        $http.get(urlbrand).then(resp => {
            $scope.brands = resp.data;
        });
    }
    
    //---------------------------------------------------------------


        // $http.post(`http://localhost:8080/down/upload/images`,data,i).then(res => {
        
        // }).catch(error => {
        //     Swal.fire(
        //         'Error',
        //         'Bạn đã gặp lỗi khi upload ảnh :)',
        //         'error'
        //       )
        // });

    // }
    //---------------------------------------------------------------

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
            Toast.fire({
                icon: 'success',
                title: 'Upload Thành Công',
              })
        }
        )
        .catch(    Toast.fire({
            icon: 'warning',
            title: 'Đang Upload Ảnh',
          }));

    
    }
    $scope.create = function(){
        var url = `${hostProduct}`;
        var data = angular.copy($scope.form);
        var name = document.getElementById("photo").value.split('\\').pop()
       data.image = name;
        data.productID = 0;
        console.log(data)

            $http.post(url,data).then(function(res){
                Swal.fire("Good job!", "Đã thêm thành công Product: "+data.name, "success");
                res.data.enteredDate = new Date(res.data.enteredDate);
                $scope.reset();
                $scope.load_all();
                
            },function(error){
                
                Swal.fire(
                    'Error',
                    'Thêm thất bại, Bạn hãy điền đúng thông tin nhé :(' + error.data,
                    'error'
                  )
            })
    }
    //---------------------------------------------------------------

    $scope.reset = function(){
     
                   
            $('#imageProduct').attr('src', '');
          
        $scope.form = {
            enteredDate : new Date(),
            image: "",
            discount : 0,
        };

            }
    //---------------------------------------------------------------
    $scope.update = function(){
        var item = angular.copy($scope.form);
        var name = document.getElementById("photo").value.split('\\').pop();
        if(name.length == 0){
            item.image = $scope.form.image;
        }
        else{
            item.image = name;
        }
        var url = `${hostProduct}/${$scope.form.productID}`;
           $http.put(url,item).then(resp=>{
               Swal.fire("Good job!", "Đã cập nhật thành công ", "success");
               var index = $scope.items.findIndex(item => item.productID == $scope.form.productID);
               $scope.items[index] = resp.data;
               $scope.reset();
              $scope.load_all();
          }).catch(error => Swal.fire(
           'Error',
           'Cập nhật thất bại, Bạn hãy điền đúng thông tin nhé :(',
           'error'
         ));
     
    }
    //---------------------------------------------------------------

    $scope.edit = function(productID){
        var url= `${hostProduct}/${productID}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            $scope.form.enteredDate = new Date(resp.data.enteredDate);

        }).catch(error => console.log("Error",error));
    }
    //---------------------------------------------------------------
    $scope.delete = function(productID){
        var url = `${hostProduct}/${productID}`;
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
                var index= $scope.items.findIndex(item => item.productID == productID);
                $scope.items.splice(index, 1);
                $scope.reset();
                $scope.load_all();
                Swal.fire(
                    'Deleted!',
                    'Xóa Thành Công!',
                    'success'
                  )
               
            }).catch(error => Swal.fire(
                'Error',
                'Xin lỗi, Product này đang được sử dụng :)',
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
    $scope.views = function(productID){
        var url= `${hostProduct}/${productID}`;
        $http.get(url).then(resp => {
            $scope.view = resp.data;

        }).catch(error => console.log("Error",error));
    }
    //---------------------------------------------------------------
    $scope.pager = {
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
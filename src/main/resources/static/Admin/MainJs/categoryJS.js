let hostCate = "http://localhost:8080/categoryRest/categories";
app.controller("ctrlCategory",function($scope,$http){
    $scope.form = {}
    $scope.items = []
    $scope.reset = function(){
        $scope.form = {
            categoryID: "",
            name: ""
        };
    }
     //---------------------------------------------------------------
    $scope.load_all = function(){
        var url = `${hostCate}`;
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            console.log("Success",resp)
        }).catch(error =>{
            console.log("Error",error)
        });
    }
     //---------------------------------------------------------------
    $scope.edit = function(categoryID){
        var url= `${hostCate}/${categoryID}`;
        $http.get(url).then(resp => {
             $scope.form = resp.data;
             console.log("success",resp)
        }).catch(error => console.log("Error",error));
    }
     //---------------------------------------------------------------
    $scope.view = function(categoryID){
        var url= `${hostCate}/${categoryID}`;
        $http.get(url).then(resp => {
            Swal.fire("Information!", "<b>ID: " +resp.data.categoryID +"</b> <br>" +"<i> Name: "+resp.data.name +"</i>", "info");
        }).catch(error => console.log("Error",error));
            }
      //---------------------------------------------------------------
    $scope.create = function(){
        var url = `${hostCate}`;
        var data = {
            categoryID:  0,
            name: $scope.form.name
        }
        if($scope.form.name.length < 3){
            Swal.fire("Bạn Sai rồi!", "Hãy nhập Name nhiều hơn 3 kí tự", "warning");
        }else{
            $http.post(url,data).then(function(res){
                Swal.fire("Good job!", "Đã thêm thành công CategoryName: "+data.name, "success");
                $scope.reset();
                $scope.load_all();
                console.log(data)
            },function(error){
                Swal.fire(
                    'Error',
                    'Thêm thất bại, Bạn hãy điền đúng thông tin nhé :(',
                    'error'
                )
            })
        }
    }
     //---------------------------------------------------------------
    $scope.update = function(){
        var item = angular.copy($scope.form);
        var url = `${hostCate}/${$scope.form.categoryID}`;
        if($scope.form.name.length < 3 ){
             Swal.fire("Bạn Sai rồi!", "Hãy nhập Name nhiều hơn 3 kí tự", "warning");
        }
        else{
            if($scope.form.categoryID.length ==0){
                 Swal.fire("Lỗi!", "Cập nhật không hợp lệ", "warning");
            }
            else{
                $http.put(url,item).then(resp=>{
                     Swal.fire("Good job!", "Đã cập nhật thành công ", "success");
                     var index = $scope.items.findIndex(item => item.categoryID == $scope.form.categoryID);
                     $scope.items[index] = resp.data;
                     $scope.reset();
       
                }).catch(error => Swal.fire(
                         'Error',
                         'Cập nhật thất bại, Bạn hãy điền đúng thông tin nhé :(',
                         'error'
                ));
            }
        }
    }
    //---------------------------------------------------------------
    $scope.delete = function(categoryID){
        var url = `${hostCate}/${categoryID}`;
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
                     var index= $scope.items.findIndex(item => item.categoryID == categoryID);
                     $scope.items.splice(index, 1);
                     $scope.reset();
                     Swal.fire(
                          'Deleted!',
                        'Xóa Thành Công!',
                          'success'
                    )
               
                }).catch(error => Swal.fire(
                    'Error',
                    'Xin lỗi, Category này đang được sử dụng :)',
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
    $scope.pagec = {
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
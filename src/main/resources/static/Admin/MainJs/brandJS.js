let hostbrand = "http://localhost:8080/brandRest/brands";
app.controller("ctrlBrand",function($scope,$http){

    $scope.form = {
    }

    $scope.items = []
     //---------------------------------------------------------------
    $scope.reset = function(){
        $scope.form = { 
              name:"",
              brandID: ""
        };
    }
     //---------------------------------------------------------------
    $scope.load_all = function(){
        var url = `${hostbrand}`;
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            console.log("Success",resp)
        }).catch(error =>{
            console.log("Error",error)
        });

    }
     //---------------------------------------------------------------
    $scope.view = function(brandID){
        var url= `${hostbrand}/${brandID}`;
        $http.get(url).then(resp => {
            Swal.fire("Information!", "<b style='font-size: 30px;' >ID: " +resp.data.brandID +"</b> <br>" +"<i style='font-size: 20px;'> Name: "+resp.data.name +"</i>", "info");
        }).catch(error => console.log("Error",error));
            }
    //---------------------------------------------------------------
    $scope.edit = function(brandID){
        var url= `${hostbrand}/${brandID}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("success",resp)
        }).catch(error => console.log("Error",error));
    }
     //---------------------------------------------------------------
    $scope.create = function(){
        var url = `${hostbrand}`;
        var data = {
            brandID:  0,
            name: $scope.form.name
        }

        if($scope.form.name.length < 2){
            Swal.fire("Bạn Sai rồi!", "Hãy nhập Name nhiều hơn 2 kí tự", "warning");
        }else{
            $http.post(url,data).then(function(res){
                Swal.fire("Good job!", "Đã thêm thành công BrandName: "+data.name, "success");
                $scope.reset();
                $scope.load_all();
            },function(error){
                alert("false")
            }
            )
        }
    }
     //---------------------------------------------------------------

    $scope.update = function(){

        var item = angular.copy($scope.form);

        var url = `${hostbrand}/${$scope.form.brandID}`;
        if($scope.form.name.length < 2){
            Swal.fire("Bạn Sai rồi!", "Hãy nhập Name nhiều hơn 2 kí tự", "warning");
        }else{
            if($scope.form.brandID.length ==0){
                 Swal.fire("Lỗi!", "Cập nhật không hợp lệ", "warning");
            }
            else{
                 $http.put(url,item).then(resp=>{
                      Swal.fire("Good job!", "Đã cập nhật thành công ", "success");
                      var index = $scope.items.findIndex(item => item.brandID == $scope.form.brandID);
                      $scope.items[index] = resp.data;
                      $scope.reset();
                 }).catch(error => console.log("Error",error));
            }
        }
    }
     //---------------------------------------------------------------
    $scope.delete = function(brandID){
        var url = `${hostbrand}/${brandID}`;
        Swal.fire({
            title: 'Xóa',
            text: 'Bạn chắc chắn muốn xóa chứ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Vâng, Tôi muốn xóa nó!',
            cancelButtonText: 'Không, Tôi nhầm!'
          }).then((result) => {
            if (result.isConfirmed) {
              //-----------------------------------------
              $http.delete(url).then(resp =>{
                var index= $scope.items.findIndex(item => item.brandID == brandID);
                $scope.items.splice(index, 1);
                $scope.reset();
                Swal.fire(
                    'Deleted!',
                    'Xóa Thành Công!',
                    'success'
                  )
               
            }).catch(error =>  Swal.fire(
                'Error',
                'Xin lỗi, Brand này đang được sử dụng :)',
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
     $scope.pageb = {
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
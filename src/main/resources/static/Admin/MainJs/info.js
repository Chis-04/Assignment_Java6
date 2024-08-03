let hostInfo = "http://localhost:8080/restAccount";
app.controller("crtlInfo",function($scope, $http){
    $scope.items = [];
    $scope.form = {};

    //---------------------------------------------------------------
    $scope.imageChangeInfo = function(files){
        var data = new FormData();
        data.append('file',files[0]);
        $http.post(`http://localhost:8080/rest/upload/imageAccount`,data,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(res => {
            $scope.imageInfo = res.data.name;
        }).catch(error => {
            Swal.fire(
                'Error',
                'Bạn đã gặp lỗi khi upload ảnh :(',
                'error'
              )
        });
        
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
        var url = `${hostInfo}/accounts/${$scope.form.email}`;
           $http.put(url,item).then(resp=>{
               Swal.fire("Good job!", "Đã cập nhật thành công ", "success");
               var index = $scope.items.findIndex(item => item.email == $scope.form.email);
               $scope.items[index] = resp.data;
               $scope.edit();
          }).catch(error => Swal.fire(
                'Error',
                'Cập nhật thất bại, Không cập nhật được Username :(',
                'error'
          ));
    }
    //---------------------------------------------------------------
    $scope.edit = function(){
        var url= `${hostInfo}/accounts/admin`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
        }).catch(error => console.log("Error",error));
    }
    //---------------------------------------------------------------
     $scope.edit();
});
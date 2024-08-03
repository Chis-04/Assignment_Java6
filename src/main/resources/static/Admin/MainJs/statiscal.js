
app.controller("ctrlstatistical",function($scope,$http){
    $scope.confirm = [];  

            $scope.load_all = function(){
                 $http.get(`http://localhost:8080/statistical/confirm`).then(res => {
                     $scope.confirm = res.data;
                 }).catch(error =>{
                      console.log("Error",error)
                 });
            }
            $scope.load = function(){
                 $http.get(`http://localhost:8080/statistical/confirms`).then(res => {
                     $scope.confirms = res.data;
        
                }).catch(error =>{
                    console.log("Error",error)
                });
            }
            $scope.xacnhan = function(orderid){
    
                $http.get(`http://localhost:8080/statistical/confirm/${orderid}`).then(resp => {
                    $scope.form = resp.data;
                    var item = $scope.form;
                    item.status = 2;
                    console.log(item);
        
                    $http.put(`http://localhost:8080/statistical/confirm/${orderid}`,item).then(resp=>{
                             Swal.fire("Hệ Thống", "Xác nhận đơn hàng thành công!!", "success");
                             $http.post(`http://localhost:8080/send/orders`,item).then(ressendOder=>{
                             console.log(ressendOder)
                             }).catch(error => {
                                    console.log(error);
                                     alert("that bai");
                             });   
                             $scope.load();
                             $scope.load_all();
                    }).catch(error => Swal.fire(
                                 'Error',
                                 'Hình như là mình hết hàng rùi :(',
                                 'error'
                    ));
     
                }).catch(error => console.log("Error",error));

            }
            $scope.huydon = function(orderid){
    
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
                        $scope.load();
                        $scope.load_all();
                  }).catch(error => Swal.fire(
                             'Error',
                             'Xác nhận rùi mà :(',
                             'error'
                  ));
         
            }).catch(error => console.log("Error",error));
    
            }

            $scope.info = function(orderid){
                $http.get(`http://localhost:8080/statistical/infoDetail/${orderid}`).then(resp => {
                $scope.items = resp.data;
            }).catch(error => console.log("Error",error));
    
            }

            $scope.top5item = function(){
                $http.get(`http://localhost:8080/statistical/top5items`).then(resp => {
                $scope.top5item = resp.data;
                }).catch(error => console.log("Error",error));
            }

            $scope.top5buyer = function(){
                $http.get(`http://localhost:8080/statistical/top5buyer`).then(resp => {
                    $scope.top5buyer = resp.data;
                }).catch(error => console.log("Error",error));
            }

           $scope.turnover = function(){
            $http.get(`http://localhost:8080/statistical/turnoverday`).then(resp => {
                $scope.itemTurnover = resp.data;
            }).catch(error => console.log("Error",error));
        
            }

            $scope.turnovermonth = function(){
                $http.get(`http://localhost:8080/statistical/turnovermonth`).then(resp => {
                    $scope.itemTurnover = resp.data;
                }).catch(error => console.log("Error",error));
            
            }

           $scope.turnoveryear = function(){
                $http.get(`http://localhost:8080/statistical/turnoveryear`).then(resp => {
                    $scope.itemTurnover = resp.data;
                }).catch(error => console.log("Error",error));
        
            }
           $scope.turnovers = {
                page: 0,
                size: 5,
                get items(){
                    var start = this.page * this.size;
                    return $scope.itemTurnover.slice(start, start + this.size);
                },
                get count(){
                    return Math.ceil(1.0 * $scope.itemTurnover.length/this.size);
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
           $scope.listConfirm = {
            page: 0,
            size: 3,
            get items(){
                var start = this.page * this.size;
                return $scope.confirm.slice(start, start + this.size);
            },
            get count(){
                return Math.ceil(1.0 * $scope.confirm.length/this.size);
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

        $scope.Confirms = {
            page: 0,
            size: 5,
            get items(){
                var start = this.page * this.size;
                return $scope.confirms.slice(start, start + this.size);
            },
            get count(){
                return Math.ceil(1.0 * $scope.confirms.length/this.size);
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
   
$scope.load_all();
$scope.load();
$scope.turnover();
$scope.top5item();
$scope.top5buyer();
});
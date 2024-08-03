

var app = angular.module("myapp", ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when("/category",{
        templateUrl: "/Adminform/pages/category.html/",
        controller: 'ctrlCategory'
    })
    .when("/product",{
        templateUrl: "/Adminform/pages/product.html/",
        controller: 'ctrlProduct' 
    })
    .when("/account",{
        templateUrl: "/Adminform/pages/accountAdmin.html",
        controller: 'ctrlAdmin' 
    }).when("/info",{
        templateUrl: "/Adminform/pages/info.html",
        controller: 'crtlInfo' 
    }).when("/brand",{
        templateUrl: "/Adminform/pages/brand.html",
        controller: 'ctrlBrand' 
    })
    .when("/statistical",{
        templateUrl: "/Adminform/pages/statistical.html",
        controller: 'ctrlstatistical' 
    })
    .otherwise({
        redirectTo: "/statistical"
    });

  
});


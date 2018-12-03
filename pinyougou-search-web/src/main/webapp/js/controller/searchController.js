app.controller('searchController', function($scope, searchService) {
	
	// 定义搜索对象的结构   category：商品分类 brand：品牌  spec:规格
	$scope.searchMap={'keywords':'','category':'','brand':'',spec:{},'price':'','pageNo':1,'pageSize':20};
	
	// 搜索
	$scope.search = function() {
		$scope.searchMap.pageNo = parseInt($scope.searchMap.pageNo);
		searchService.search($scope.searchMap).success(function(response) {
			$scope.resultMap = response;	// 搜索返回的结果
			buildPageLable();				// 构建分页标签
		});
	}
	
	// 构建分页标签
	buildPageLable=function(){
		$scope.pageLable=[];
		var firstPage = 1;		// 开始页码
		var lastPage = $scope.resultMap.totalPages;	 // 截止页码
		$scope.firstDot = true;
		$scope.lastDot = true;
		
		if (lastPage > 5){
			if ($scope.searchMap.pageNo<=3){	// 当前页码小于3，显示前五页
				lastPage = 5;
				$scope.firstDot = false;
			}else if ($scope.searchMap.pageNo>=lastPage-2) {	// 当前页码大于总页数-2，则显示后5页
				firstPage = lastPage - 4;
				$scope.lastDot = false;
			}else {
				firstPage = $scope.searchMap.pageNo - 2;
				lastPage = $scope.searchMap.pageNo + 2;
			}
		}else{
			$scope.firstDot = false;
			$scope.lastDot = false;
		}
		
		for (var i = firstPage; i <= lastPage; i++) {
			$scope.pageLable.push(i);
		}
	}
	
	// 添加查询搜索项
	$scope.addSearchItem=function(key,value){
		if (key == 'brand' || key == 'category' || key == 'price') {	// 如果点击品牌和分类
			$scope.searchMap[key] = value;
		}else{
			$scope.searchMap.spec[key]=value;
		}
		$scope.search();
	}
	
	// 取消查询条件
	$scope.removeSearchItem=function(key){
		if (key == 'brand' || key == 'category' || key == 'price') {	// 如果点击品牌和分类
			$scope.searchMap[key] = "";
		}else{
			delete $scope.searchMap.spec[key];
		}
		$scope.search();
	}
	
	// 分页查询
	$scope.queryByPage=function(pageNo){
		if (pageNo<1 || pageNo>$scope.searchMap.pageNo)
		$scope.searchMap['pageNo'] = pageNo;
		$scope.search(); 
	}
});
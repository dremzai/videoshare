 
let baseUrl = 'http://47.114.91.22:1888';  // fj安器具测试api 

const httpResponse = (url, method, data,method1) => {
	// 判断method的请求类型,修改header参数
	let headers = method == "POST" ? {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	} : {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	if(method1=="json"){
		headers={
			"Content-Type": "application/json; charset=UTF-8",
		}
	}
	//当前登入用户信息 
	let userId=uni.getStorageSync('userId');
	if(userId!=null&&userId!=undefined&&userId!='')
	{
		headers={
			...headers,
			'userId':userId, 
		}
	}
	let httpDefault = {
		url: baseUrl+url,
		data: data,
		method: method,
		header: headers,
		dataType: 'json'
	};
	return new Promise((resolve, reject) => {  
		uni.request(httpDefault).then((res) => {
			console.log("成功",res)
			if(res[1].statusCode == 500){
				uni.showToast({
					title:"服务器内部错误",
					icon:"none"
				})   
			} 
			else if(res[1].statusCode !== 200){
				uni.showToast({
					title:res[1].data.message,
					icon:"none"
				})  
			} else {
				if(res[1].data.success==false){
					uni.showToast({
						title:res[1].data.message,
						icon:"none"
					}) 
				}
				else{ 
					resolve(res[1].data.result)
				}
			}
			uni.hideLoading()
		}).catch((response) => { 
			uni.hideLoading()
			reject(response);
		})
		uni.hideLoading();
		
	})
}

export default { baseUrl, httpResponse };





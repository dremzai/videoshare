 
let baseUrl = 'https://test.videoapp.mianxiangkeji.com'; 

const httpResponse = (url, method, data,method1) => {
	// 判断method的请求类型,修改header参数
	let headers = method == "POST" ? {
		"Content-Type": "application/json; charset=UTF-8",
		"Access-Control-Allow-Origin": "*",
	} : {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}; 
	//当前登入用户信息 
	let userId=uni.getStorageSync('user').id
	let openId=uni.getStorageSync('user').wxOpenid
	if(userId!=null&&userId!=undefined&&userId!='')
	{
		headers={
			...headers,
			'userId':userId, 
			'openId':openId, 
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
		uni.showLoading();
		uni.request(httpDefault).then((res) => {
			console.log("成功",res)
			uni.hideLoading();
			if(res[1].statusCode == 500){
				uni.showToast({
					title:"服务器内部错误",
					icon:"none",
					duration:2000
				})   
			} 
			else if(res[1].statusCode !== 200){
				uni.showToast({
					title:res[1].data.message,
					icon:"none",
					duration:2000
				})  
			} else {
				if(res[1].data.success==false){
					uni.showToast({
						title:res[1].data.message,
						icon:"none",
						duration:2000
					}) 
				}
				else{ 
					resolve(res[1].data.result)
				}
			} 
		}).catch((response) => { 
			uni.hideLoading()
			reject(response);
		})  
	})
}

export default { baseUrl, httpResponse };





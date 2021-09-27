import Api from './requestApi.js'


let ossTimestamp = 0
let isGetKey = 0
let OSS_BASE = {
	host: ''
};
const ossInfo = (isGetKey) => {
	return new Promise(function(resolve, reject) {
		//获取ossKey 判断获取时间是否超时
		if (isGetKey == 1) {

			Api.httpResponse("/stm/api/oss/getOssParam", 'GET').then((res) => {

				//记录获取ossKey时间
				ossTimestamp = Date.now()
				OSS_BASE = res
				isGetKey = 0
				
				resolve(res)
				
			}).catch((error) => {
				reject(error)

			})
		} else {
			resolve(OSS_BASE)
		}
	})
}





export const ossUpFile = (tempFile, index, BASIC_INFO) => {

	return new Promise(function(resolve, reject) {

		const onUploadProgress = (e) => {
			(e.loaded / e.total * 100)
		}

		let fileName = Date.now() + '.' + (tempFile.split('/')[tempFile.split('/').length - 1].split('.'))[
			tempFile.split('/')[tempFile.split('/').length - 1].split('.').length - 1];
		let fileKey =
			`${new Date().getFullYear()}年${new Date().getMonth()+ 1}月${new Date().getDate()}日/${fileName}` //d.dir + fileName;
		let realyPath = `${BASIC_INFO.host}/${fileKey}`;

		let fileInfo = {
			realyPath
		}

		wx.uploadFile({
			url: OSS_BASE.host, //	string		是	开发者服务器地址
			filePath: tempFile, //	string		是	要上传文件资源的路径 (本地路径)	
			name:"file",
			formData: {
				name: fileName,
				key: fileKey,
				policy: BASIC_INFO.policy,
				OSSAccessKeyId: BASIC_INFO.accessid,
				signature: BASIC_INFO.signature,
				success_action_status: '200'
			}, //	Object		否	HTTP 请求中其他额外的 form data	
			timeout: "60000", //	number		否	超时时间，单位为毫秒	2.10.0
			success: () => {
				resolve({
					index,
					fileInfo
				})
			}, //	function		否	接口调用成功的回调函数	
			fail: (error) => {
				reject(error)
			}
		})




	})


}





//多文件上传
export async function upLoadFiles(list) {
	if ((Date.now() - ossTimestamp) > (60 * 3 * 1000)) {
		isGetKey = 1
	} else {
		isGetKey = 0
	}
	let pList = []
	await ossInfo(isGetKey).then((BASIC_INFO) => {
		uni.showLoading({
			title: "上传中",
			mask: true
		})
		for (let index = 0; index < list.length; index++) {
			pList.push(ossUpFile(list[index], index, BASIC_INFO))
		}
	}).catch((error) => {
		//获取OSS 信息失败
		console.log(error);
	})

	return Promise.all(pList)

}

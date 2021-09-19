class Util {
	static setToken(len) {
	len = len || 32
	let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
	let maxLen = $chars.length
	let pwd = ''
	for(var i = 0; i < len; i++){pwd += $chars.charAt(Math.floor(Math.random() * maxLen))
		}
	return pwd
	}
	
	// 验证手机号
	static checkTel(val) {
	let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
	if(val == '' || !reg.test(val)){return false
		}
		return true
	}
}
export default Util
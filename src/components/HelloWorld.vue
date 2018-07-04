<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {getConfigParam} from 'api/public'
import wx from 'weixin-js-sdk'
import {key} from 'api/config'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      requestUrl: ''
    }
  },
  created () {
    // this._getConfigParam()
	  this.data = {
		  url: window.location.href.split('#')[0]
		}
    this.$ajax.get( '/api/weiXin/getWeiChatJsapiTicketApi' + key, {params: this.data}).then(function(res){
      // 成功回调
    },function(){
      alert("error")
    })
  },
	mounted () {
	  /* this.$ajax({
		  method: 'post',
			url: 'http://localhost:8086/weiXin/getWeiChatJsapiTicketApi' + key,
			data: {},
		}).then(res => {
		  console.log(JSON.stringify(res))
		}).catch(function(err) {
		  console.log(err)
		}) */
	},
  methods: {
    _getConfigParam () {
      this.data = {
        url: window.location.href.split('#')[0]
      }
      getConfigParam(this.data).then((res) => {
        if (res.result === 200) {
          this.setConfig(res.object)
        } else {
          alert(res.object)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    setConfig (object) {
      wx.config({
        debug: false,
        appId: object.appId, // 必填，公众号的唯一标识
        timestamp: object.timestamp, // 必填，生成签名的时间戳
        nonceStr: object.nonceStr, // 必填，生成签名的随机串
        signature: object.signature, // 必填，签名，见附录1
        jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage' ]
      })
      wx.ready(() => {
        let shareData = {
          title: '中移铁通微商城', // 分享标题
          link: window.location.protocol + '//' + window.location.host + '/share?url=' + (this.$route.query.url || ''), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.protocol + '//' + window.location.host + '/image/url_share.png', // 分享图标
          desc: '提供优质硬件设备，专业定制服务，让您体验最专业的、放心的优质服务。',
          type: '',
          dataUrl: '',
          success () {
            // alert('success')
          },
          cancel () {
            // alert('cancel')
          }
        }
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareAppMessage(shareData)
      })
      wx.error((res) => {
        // alert(JSON.stringify(this.data.url), JSON.stringify(res))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

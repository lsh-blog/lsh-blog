/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4358cd094da45f548bfe83b6fccfb7b1"
  },
  {
    "url": "Another/Fillory.html",
    "revision": "65427bb82c2f81d79950e4d5d51f3fb2"
  },
  {
    "url": "Another/MySelf.html",
    "revision": "1054d6f694c3f7b5f9fc90c6e8890ddc"
  },
  {
    "url": "Another/Project.html",
    "revision": "9fdc056db47a89c819cf94f1c887e260"
  },
  {
    "url": "Another/Review.html",
    "revision": "d7df7cea58e9e545a73fcf1d95a449c2"
  },
  {
    "url": "assets/css/0.styles.0b5e6da7.css",
    "revision": "96c9ffc674fcfb7210063c21796769b6"
  },
  {
    "url": "assets/img/001.b9fa5ca8.jpg",
    "revision": "b9fa5ca84f89cadc463d44c68ea8e33e"
  },
  {
    "url": "assets/img/002.3813aefb.jpg",
    "revision": "3813aefbd1ce44d9db5ed98db9cc0f4c"
  },
  {
    "url": "assets/img/003.d5ecd8fe.jpg",
    "revision": "d5ecd8fe28a5033d57d79f2bb9f4fb42"
  },
  {
    "url": "assets/img/004.6102c5a8.jpg",
    "revision": "6102c5a8da8c9c3156dacdd3e1ae6b75"
  },
  {
    "url": "assets/img/005.5ee4517a.jpg",
    "revision": "5ee4517ae8ecac8f06ba683930d8a7f3"
  },
  {
    "url": "assets/img/githubLink.7fabd7af.jpg",
    "revision": "7fabd7af2a1a06803aa35aabfe33c5a2"
  },
  {
    "url": "assets/img/google_analysis.2edd12f3.jpg",
    "revision": "2edd12f37a95dc9fe395cb91122332b9"
  },
  {
    "url": "assets/img/google_post.e19082be.jpg",
    "revision": "e19082be1304dc86ecea9fa64a2a1dad"
  },
  {
    "url": "assets/img/linear_home.0d3acd95.jpg",
    "revision": "0d3acd9568bea627a90b9768ea9be234"
  },
  {
    "url": "assets/img/linear_scroll.396161bc.jpg",
    "revision": "396161bcf5dea38a6d98c6dca5b03f53"
  },
  {
    "url": "assets/img/little_luffy.a6c7690d.png",
    "revision": "a6c7690d32cba92a1015f9b1c3ddce07"
  },
  {
    "url": "assets/img/logo-White.98dace1e.jpg",
    "revision": "98dace1ebcba4e9345d3aef610143b4b"
  },
  {
    "url": "assets/img/pwa-post.5922cce0.jpg",
    "revision": "5922cce0fd661cfc16049db6d4cade75"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/sw_popup_my.507a1597.png",
    "revision": "507a15970a1fbc312959602df805c514"
  },
  {
    "url": "assets/img/swpopup_demo.bddc4d9d.jpg",
    "revision": "bddc4d9dd7d3934d336a6ab1c554a5bb"
  },
  {
    "url": "assets/img/swpopup_old.1b1dfa29.jpg",
    "revision": "1b1dfa29f19c3a818a4532b97e618de2"
  },
  {
    "url": "assets/img/versions.6306b5ab.jpg",
    "revision": "6306b5ab6610e0e2cce99e20ac4cde9b"
  },
  {
    "url": "assets/js/1.08ab626e.js",
    "revision": "394cc455f191fe5817c24031a5d404ff"
  },
  {
    "url": "assets/js/10.35ad4554.js",
    "revision": "b42ebc1c307ed7b00dd8ccac4220da1b"
  },
  {
    "url": "assets/js/11.7977b6c3.js",
    "revision": "6e4a3f95fec5e524eff7f2f0bf7db177"
  },
  {
    "url": "assets/js/12.ab00bddb.js",
    "revision": "494004df2983c3f212dcc06be723458f"
  },
  {
    "url": "assets/js/13.3b4adb02.js",
    "revision": "86a8a87b585b59a64ff04a6d2ab4fb72"
  },
  {
    "url": "assets/js/14.f1a4a908.js",
    "revision": "924ecde8fb3faeeee8aefd700fbb01a6"
  },
  {
    "url": "assets/js/15.e9162c80.js",
    "revision": "6c83635a25c6b7f7f0207b17de87388d"
  },
  {
    "url": "assets/js/16.ab409374.js",
    "revision": "18f0f731566218216b6ab8901aca1929"
  },
  {
    "url": "assets/js/17.e8e43989.js",
    "revision": "aefd162c242e41dd5e54900e7146c044"
  },
  {
    "url": "assets/js/18.35073862.js",
    "revision": "322852950f58c41f339da6dbaded5cd5"
  },
  {
    "url": "assets/js/19.daf38b34.js",
    "revision": "d24f64e83900de11c4f89aba1349d357"
  },
  {
    "url": "assets/js/2.0a47909f.js",
    "revision": "465fcf3a6527ba4584d2835e54746947"
  },
  {
    "url": "assets/js/20.779d8c7c.js",
    "revision": "a6024fd37de109566c85d483e4203d77"
  },
  {
    "url": "assets/js/21.d561d2b2.js",
    "revision": "ed8c0fed28a7bc810d3aa6b3a30517b0"
  },
  {
    "url": "assets/js/22.bf03e8d8.js",
    "revision": "ecfb48d9896884e7b4fa25f91601fb92"
  },
  {
    "url": "assets/js/23.299eaf83.js",
    "revision": "93384abee75a62301d8821f25d621a33"
  },
  {
    "url": "assets/js/24.a440ab0e.js",
    "revision": "11a7e7b26e92246bbb7fe1593f224731"
  },
  {
    "url": "assets/js/25.92dd6d34.js",
    "revision": "50d24c0426402dfb6a80d2a19e713ad7"
  },
  {
    "url": "assets/js/26.d09331cc.js",
    "revision": "2b39d1791cf76f8ba06abb88a17945f4"
  },
  {
    "url": "assets/js/27.22747364.js",
    "revision": "fc3efa78db165d0fd175b861e64289f7"
  },
  {
    "url": "assets/js/28.9bf5da7b.js",
    "revision": "cd283579d497b244605119aaea0cbdc6"
  },
  {
    "url": "assets/js/29.db0410ab.js",
    "revision": "272d89354a4adcc0ea517433a5bfff4a"
  },
  {
    "url": "assets/js/30.6d7d3b85.js",
    "revision": "ed7240ecce1b2c8995996e59c1d3f92c"
  },
  {
    "url": "assets/js/31.88c3aa63.js",
    "revision": "c54b7528c7802517f1aa1bba477be886"
  },
  {
    "url": "assets/js/32.a42cf8d7.js",
    "revision": "b03b32edba30bf8f0c97d3b2a0fd5b02"
  },
  {
    "url": "assets/js/33.93256f3a.js",
    "revision": "a92776b16ddc512a51103b5b7508797e"
  },
  {
    "url": "assets/js/34.9512484a.js",
    "revision": "c6d25dd0cb6438f442d4f2b3353469b9"
  },
  {
    "url": "assets/js/35.f9e0b8d4.js",
    "revision": "b12d9b99cfbebfde9eb543c359e2f0d1"
  },
  {
    "url": "assets/js/36.f4f22b81.js",
    "revision": "54a9990f80f52ea35e21775398211c70"
  },
  {
    "url": "assets/js/37.b92df53a.js",
    "revision": "ca0af4a6f0108f513024655124c896a6"
  },
  {
    "url": "assets/js/4.42799d6b.js",
    "revision": "f4d9304eb8b32b97662264c526e65307"
  },
  {
    "url": "assets/js/5.fd093e0b.js",
    "revision": "183bf7c0ac422090cfb09a63860f03e7"
  },
  {
    "url": "assets/js/6.bb0763e9.js",
    "revision": "f0d100d71007e81d1b21fac4627f9bba"
  },
  {
    "url": "assets/js/7.51c083bc.js",
    "revision": "71f91ddaf52babb71f9a37ab1465231b"
  },
  {
    "url": "assets/js/8.547a42e7.js",
    "revision": "316c6f5e15be9898ae18af42ccb8e9fd"
  },
  {
    "url": "assets/js/9.ddc1fab7.js",
    "revision": "c31b844355380eff3e552710a9104b41"
  },
  {
    "url": "assets/js/app.6cd43fdc.js",
    "revision": "823d9c3915a84964067ec6befc9bee76"
  },
  {
    "url": "FAQ/Console/A000.html",
    "revision": "7cccd01393aea74d56e1bbe7d54b4144"
  },
  {
    "url": "FAQ/Console/A001.html",
    "revision": "d1b7ab4adcf1bdd36e6ae7788bd98508"
  },
  {
    "url": "FAQ/Console/A002.html",
    "revision": "b5c3fdaed7a0e75ab608c20693944cee"
  },
  {
    "url": "FAQ/DigestionHeap/Digested.html",
    "revision": "e869678c3fa1c02b1972c0c48b9b3ffd"
  },
  {
    "url": "FAQ/DigestionHeap/Digesting.html",
    "revision": "3302da2e40c36a0820095d5a45487570"
  },
  {
    "url": "FAQ/DigestionHeap/DigestWill.html",
    "revision": "bd1a8c3995006e6915c7e0e398466883"
  },
  {
    "url": "FAQ/Wiki.html",
    "revision": "a3146383a96f44607303bcc2a7cbb7fe"
  },
  {
    "url": "img/images.png",
    "revision": "124eacef3c84742af7451b26db7b294b"
  },
  {
    "url": "img/links/default.png",
    "revision": "bd114d9649ac225e3937b91a869b4128"
  },
  {
    "url": "img/little_luffy.png",
    "revision": "a6c7690d32cba92a1015f9b1c3ddce07"
  },
  {
    "url": "img/logo-White.jpg",
    "revision": "98dace1ebcba4e9345d3aef610143b4b"
  },
  {
    "url": "img/logo.gif",
    "revision": "21d3e097707ea47c3be011cfbf50e93b"
  },
  {
    "url": "img/logo.jpg",
    "revision": "ca1ad31009e774bfca64e31a82cb6f9a"
  },
  {
    "url": "img/logo.png",
    "revision": "03345d37b5250ea2d0a752481fd982b0"
  },
  {
    "url": "img/lol_yasso.jpg",
    "revision": "b1bf4c7d549b57218c62a2f232fe52eb"
  },
  {
    "url": "img/modelLeft.jpg",
    "revision": "998c2aecfad6fe303f29b4abdbc5e813"
  },
  {
    "url": "img/modelRight.jpg",
    "revision": "5b58ce3e42b0454dd42746471d22e42e"
  },
  {
    "url": "img/poke_ball.gif",
    "revision": "d6cc89a7bef9301e7e47242a3f046bbe"
  },
  {
    "url": "img/users/finen.png",
    "revision": "97e6724c4f5204f87757b8c98490f506"
  },
  {
    "url": "img/users/orange.jpg",
    "revision": "dfdf9f5b6e8122ac76479ee38297b42e"
  },
  {
    "url": "img/wiki/Baidu.png",
    "revision": "dfa63b81c92322d44db59e06cd0ad259"
  },
  {
    "url": "img/wiki/baiduHelp.png",
    "revision": "d91ad7ef1b5642a4a291ea87c563d0df"
  },
  {
    "url": "img/wiki/bing.png",
    "revision": "c6c301113aeffd8f80029a72e6e7037d"
  },
  {
    "url": "img/wiki/default.png",
    "revision": "bd114d9649ac225e3937b91a869b4128"
  },
  {
    "url": "img/wiki/earth.png",
    "revision": "5bedfd819a77ac7d87befdff600e3a5f"
  },
  {
    "url": "img/wiki/google.png",
    "revision": "b4ddf57cc277d4ac6cb237c71b327c73"
  },
  {
    "url": "img/wiki/hacker.png",
    "revision": "7ce17c1d46025625752d9d8869e4b2d8"
  },
  {
    "url": "img/wiki/vue.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "img/wiki/Wikipedia.png",
    "revision": "a9bcbc01c4d9ca7c299b478d123a6a75"
  },
  {
    "url": "index.html",
    "revision": "52b2302fa731e8e9570fb3240fd22681"
  },
  {
    "url": "js/canvas_ribbon.js",
    "revision": "c9e4544af77252c4bd97b416b4e4cb44"
  },
  {
    "url": "js/loadAsyncScript.js",
    "revision": "60cd267be0386002d2041e0f7674133e"
  },
  {
    "url": "lib/bomb.js",
    "revision": "52bcbf8f12e13c4b88a64074af99149a"
  },
  {
    "url": "lib/L2Dwidget.0.min.js",
    "revision": "f9c7211c9fab319db580d8c2e75e62a9"
  },
  {
    "url": "lib/L2Dwidget.min.js",
    "revision": "c7ee4e8c7c9dd8f6abea404eaf68e30a"
  },
  {
    "url": "Store/Dev/Issue.html",
    "revision": "f5e6f1f474a32d4684c9cfe6e6ff6fb9"
  },
  {
    "url": "Store/Dev/Links.html",
    "revision": "abae30d5a4fbdd88699385bdeea1ba61"
  },
  {
    "url": "Store/Dev/Plugins.html",
    "revision": "b1d02c18a9664f010a86909a17ab19d4"
  },
  {
    "url": "Store/index.html",
    "revision": "0cea8da7cdfe73c82692e378d616fe57"
  },
  {
    "url": "Thought/index.html",
    "revision": "354f07430f4ef039b500255efeac002f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

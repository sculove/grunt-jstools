# grunt-jstools
javascript 배포에 필요한 작업을 하는 grunt 플러그인

- javascript 파일을 하나의 파일로 합치거나 각각의 파일을 대상 폴더에 복사한다
- 합쳐지거나 복사된 파일을 최적화 level에 따라 주석 제거(nocomment), 최소화(min), 코드 난독화(default) 작업을 진행한다.


## About
이 태스트(task)는 [multi task]이다. grunt는 자동적으로 'jstools' 타겟 아래의 작업들을 순환하며 실행한다.


## Install
1. [nodejs]와 [grunt-cli]를 설치한다.
2. 프로젝트 [grunt 프로젝트 생성 가이드][getting-started]에 따라 Gruntfile.js 파일과 package.json 파일을 생성하고, grunt-jstools를 npm을 통해 설치한다. (--save-dev 옵션을 주면 자동으로 package.json파일에 devDependency가 추가된다)
```
npm install grunt-jstools --save-dev
```
3. grunt.js 파일에 다음과 같은 코드를 통해 grunt-jstools를 타스크를 로딩한다.

[nodejs]: http://nodejs.org/
[grunt-cli]: http://gruntjs.com/getting-started#installing-the-cli
[getting-started]: http://gruntjs.com/getting-started#preparing-a-new-grunt-project


## Project configuration
다음은 grunt-jstools 플러그인을 사용하기 위해, grunt.js에 'jstools' 타스크(task)에 'dist'를 추가하고, grunt-jstools를 로딩한 예이다.

```javascript
// grunt.js 설정 파일
grunt.initConfig({
  // Lists of files to be concatenated.
  jstools: {
  	작업종류 : {
  		// 작업대상이 될 javascript 파일 패턴
		src: [],
		// 결과물이 될 파일이나, 디렉토리
		dest: '',
		// 작업대상의 주석을 제거하거나, 축소하거나, 코드 난독화 종류를 지정
		level: ""
  	}
  }
});

// grunt-jstools 플러그인을 로딩한다. 
grunt.loadNpmTasks('grunt-jstools');
```

- `src` -- 대상이 되는 javascript 파일 패턴 (필수값)
- `dest` -- 주석제거, 최소화, 코드 암복호화가 적용될 대상. 디렉토리일 경우, `src` 패턴에 해당되는 파일들이 디렉토리에 생성된다. 파일일 경우, `src` 패턴에 해당되는 파일들이 하나로 합쳐진다. (필수값)
- `level` -- 생략할 경우, 코드 난독화가 적용되고, `nocomment`일 경우, 주석만 제거되고, `min`일 경우, 주석이 제거되고, 코드가 최소화된다.


## Usage examples

### 다수의 소스(디렉토리, 파일)을 하나의 파일로 만드는 예
`grunt jstools:type1`를 호출하면 'src'에 입력한 패턴에 해당하는 파일을 'merge_min.js' 파일 하나로, 코드 난독화하여 생성된다.
```javascript
// Project configuration.
grunt.initConfig({
  jstools: {
    type1: {
		src : [ "source/**/*.js", "jindo.js" ],
		dest : "merge_min.js"
    }
  }
});

grunt.loadNpmTasks('grunt-jstools');
```

### 다수의 소스(디렉토리, 파일)을 하나의 디렉토리에 각각 복사하는 예
`grunt jstools:type2`를 호출하면 'src'에 입력한 패턴에 해당하는 파일을 'output' 디렉토리 하위에 src에 입력한 파일들이 각각 주석이 제거(nocomment)된 상태로 생성된다.
```javascript
// Project configuration.
grunt.initConfig({
  jstools: {
    type2: {
		src : [ "source/**/*.js", "jindo.js" ],
		dest : "output",
		level : "nocomment"
    }
  }
});

grunt.loadNpmTasks('grunt-jstools');
```

### Multiple build targets
'grunt jstools'를 호출하면 
type1이 호출되어, type1의 'src'에 입력한 패턴에 해당하는 파일을 'merge_min.js' 파일 하나로, 최소화(min)하여 생성되고,
type2가 호출되어, type2의 'src'에 입력한 패턴에 해당하는 파일을 'output' 디렉토리 하위에 src에 입력한 파일들이 각각 코드 난독화된 상태로 생성된다.

```javascript
// Project configuration.
grunt.initConfig({
	jstools : {
		type1: {
			src : [ "source/**/*.js", "jindo.js" ],
			dest : "merge_min.js",
			level : "min"
		}
		type2: {
			src : [ "source/**/*.js", "jindo.js" ],
			dest : "output"
		}
	}
});

grunt.loadNpmTasks('grunt-jstools');
```


## Release History
- v1.1.2 change License from LGPL v2 to MIT (2015. 12. 10)
- v1.1.1 의존 라이브러리 추가 (2013. 11. 20)
- v1.1.0 dest 속성에 해당하는 디렉토리가 있을 경우 오류 수정 (2013. 11. 20)
- v1.1.0 dest 속성 필수로 변경 (2013. 11. 17)
- v1.1.0 grunt 4.0 base로 변경 (2013. 11. 17)
- v1.0.1 압축률 및 gzip 했을 경우의 변화량을 알려줌 (2013. 1. 25)
- v1.0.0 최초 릴리즈 (2013. 1. 24)

## Refrenece site
http://gruntjs.com/getting-started  
http://gruntjs.com/api/grunt  
https://github.com/mishoo/UglifyJS2  
http://lisperator.net/uglifyjs/  
http://blog.outsider.ne.kr/829  

## License
Licensed under LGPL v2:  
https://www.gnu.org/licenses/old-licenses/lgpl-2.0.html

[![Analytics](https://ga-beacon.appspot.com/UA-37362821-5/grunt-jstools/readme)](https://github.com/sculove/grunt-jstools)
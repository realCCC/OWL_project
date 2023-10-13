# 👉 OWL Project
<br>

# 프로젝트 소개

> 스프링 부트 + My SQL + Spring Data JPA를 활용한 심야식당 찾기 웹서비스 프로젝트 입니다.  <br>
> API와 스프링 부트를 활용한 심야시간 음식점을 찾는 웹서비스입니다.
> 사용자는 심야시간에 영업하는 음식점을 마감시간에 따른 정보로 지도에서 확인할 수 있습니다.

# 개발환경

## 프론트엔드
-프로그래밍언어 : HTML, CSS, JavaScript
## 백엔드
프로그래밍 언어: Java <br>
프레임워크: Spring Boot, Spring Data JPA, Spring Web MVC <br>
개발 환경 및 생산성: Gradle, Lombok, Tomcat <br>
데이터베이스: MySQL <br>
클라이언트 도구(DB): HeidiSQL <br>
웹 뷰 및 템플릿: BootStrap, Thymeleaf <br>
배포 및 형상 관리: Git, Github <br>


### 구글맵 API: Google Maps JavaScript API
### 웹 서버: Apache

# 주요 기능 

- 프로젝트 주제선정 및 내용 구체화
- 회원가입 및 로그인 기능 구현
- 회원목록조회, 회원정보 수정기능
- 게시판 CRUD : 게시글 작성/조회/수정 및 삭제 기능 구현
- 구글 api를 활용해 길찾기, 마커표시, 가게 오픈시간과 마감시간 정보를 표시
- ajax를 활용한 회원가입 시 이메일 중복 검사
- 자바스크립트를 활용한 룰렛기능을 넣어주어 메뉴 선정 기능
- 세션값으로 로그인된 회원들만 가능한 기능들에 권한부여

## 문제 해결 경험

- 중복된 이름의 회원가입을 막기위해 ajax를 사용하여 해결
- 계정 별 권한을 주기위해 세션값을 활용하고 Thymeleaf문법을 이용해 각각의 기능을 제한
- SQL문을 효과적으로 사용하기위해 JPA기술을 활용하여 해결

## 검색기능으로 검색 후 해당 매장의 영업정보 표시
3시간 이상 매장이 운영중이라면 초록색의 이미지로 표현
![image](https://github.com/realCCC/OWL_project/assets/101503824/9577aca6-e1d6-4fb8-b18b-7533adc58f25)

## 회원가입과 로그인 페이지

| ![이미지 1 설명](https://github.com/realCCC/OWL_project/assets/101503824/2bbf33bc-660a-4589-a1a2-414c3d2e04e5) | ![이미지 2 설명](https://github.com/realCCC/OWL_project/assets/101503824/d3af72cb-2a27-47f7-88bc-5fbe07a0a19c) |
|---|---|

## 룰렛과 게시판 기능
| ![이미지 1 설명](https://github.com/realCCC/OWL_project/assets/101503824/893963b5-4b83-4feb-8f6a-84a6928ed327) | ![이미지 2 설명](https://github.com/realCCC/OWL_project/assets/101503824/6fb5ed0d-fa82-4316-8309-1ef7c12344c5) |
|---|---|

## 회원정보 수정정보와 권한기능
| ![이미지 1 설명](https://github.com/realCCC/OWL_project/assets/101503824/c8d62f89-db4a-4313-a1b5-39c448bcfba8) | ![이미지 2 설명](https://github.com/realCCC/OWL_project/assets/101503824/70394086-b464-4b86-bcd8-e29f23f0ccbf) |
|---|---|

## 데이터베이스 구성
다음은 데이터베이스 구성입니다. <br>
![image](https://github.com/realCCC/OWL_project/assets/101503824/f57fbe08-1b66-456e-ab23-8bc20e8994e2)

| ![이미지 1 설명](https://github.com/realCCC/OWL_project/assets/101503824/fa17f50c-b831-4147-8025-65aae706a824) | ![이미지 2 설명](https://github.com/realCCC/OWL_project/assets/101503824/379c0a2f-82b4-4fb2-986a-228b867340f2) |
|---|---|






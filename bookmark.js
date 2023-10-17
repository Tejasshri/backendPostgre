const bookmarks = [
  {
    id: 1,
    web_logo:
      "https://media-exp1.licdn.com/dms/image/C4D0BAQHF7HLEYX6LSQ/company-logo_200_200/0/1607800000814?e=2159024400&v=beta&t=GhDf2E1ixnXHT2c4bQQE58T---2Mw86d6mi3lHAnzyA",
    url: "https://www.w3schools.com/css/css3_2dtransforms.asp",
    display_text: "w3school",
    user_id: "6",
  },
  {
    id: 2,
    web_logo:
      "https://cdn-images-1.medium.com/max/1600/1*6XgfDCVn81AYX68Xvd2I-g@2x.png",
    url: "https://www.figma.com/files/recents-and-sharing/recently-viewed?fuid=1284346621041926864",
    display_text: "Figma",
    user_id: "6",
  },
  {
    id: 3,
    web_logo:
      "https://th.bing.com/th/id/OIP.hxf2uTNGSshD7ZzKAURnmwHaHa?pid=ImgDet&rs=1",
    url: "https://tododb.ccbp.tech/",
    display_text: "TodoList",
    user_id: "6",
  },
  {
    id: 4,
    web_logo:
      "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/032013/behance-be-logo-01.png?itok=sH__Jpc0",
    url: "https://www.behance.net/search/projects?tracking_source=typeahead_search_direct&search=quiz",
    display_text: "Behance",
    user_id: "6",
  },
  {
    id: 5,
    web_logo: "",
    url: "https://react-select.com/home",
    display_text: "React-Select",
    user_id: "6",
  },
  {
    id: 6,
    web_logo:
      "https://th.bing.com/th/id/OIP.7XHx-ExFsl9aXepkPL0kWwHaEH?pid=ImgDet&rs=1",
    url: "https://rapidapi.com/hub",
    display_text: "Rapi API",
    user_id: "6",
  },
  {
    id: 7,
    web_logo:
      "https://th.bing.com/th/id/OIP.N8i3UYAKIIsHDuLb2VSzQQAAAA?pid=ImgDet&rs=1",
    url: "https://tejnxtwatch.ccbp.tech/",
    display_text: "Nxtwatch",
    user_id: "6",
  },
  {
    id: 8,
    web_logo: "https://codecondo.com/wp-content/uploads/2017/07/Dribble.png",
    url: "https://dribbble.com/shots/popular?tag=quiz",
    display_text: "Dribble",
    user_id: "6",
  },
  {
    id: 9,
    web_logo:
      "https://seeklogo.com/images/M/material-ui-logo-5BDCB9BA8F-seeklogo.com.png",
    url: "https://mui.com/material-ui/getting-started/installation/",
    display_text: "Material UI",
    user_id: "6",
  },
  {
    id: 11,
    web_logo:
      "https://th.bing.com/th/id/OIP.LBJduA4XyfAD5wOP7ZITEgHaD0?pid=ImgDet&rs=1",
    url: "https://free-apis.github.io/#/browse",
    display_text: "API FETCH",
    user_id: "6",
  },
  {
    id: 10,
    web_logo:
      "https://th.bing.com/th/id/OIP.XcE0kGVVCyZaOGTmSlOXPwHaHa?pid=ImgDet&rs=1",
    url: "https://docs.python.org/3/tutorial/",
    display_text: "python",
    user_id: "6",
  },
  {
    id: 12,
    web_logo:
      "https://th.bing.com/th/id/OIP.045ArS-D5OMZ4AOdB8uDCwHaEK?pid=ImgDet&rs=1",
    url: "https://dashboard.render.com/web/srv-ckip7vke1qns73dpcvag/deploys/dep-ckipbma12bvs73899ltg",
    display_text: "Render deploy",
    user_id: "6",
  },
  {
    id: 13,
    web_logo:
      "https://th.bing.com/th/id/OIP.qVqFjQaKQK8LdTUWUON9pgHaJ3?pid=ImgDet&rs=1",
    url: "https://tejasdigitimer.ccbp.tech/",
    display_text: "Digital Timer",
    user_id: "6",
  },
  {
    id: 14,
    web_logo:
      "https://th.bing.com/th/id/OIP.fl-TxWLB-xZFWQWKePLZmwAAAA?pid=ImgDet&rs=1",
    url: "https://app.zeplin.io/projects",
    display_text: "Zeplin",
    user_id: "6",
  },
  {
    id: 15,
    web_logo:
      "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png",
    url: "https://tejasshree.ccbp.tech/login",
    display_text: "Nxt Trenz",
    user_id: "6",
  },
  {
    id: 16,
    web_logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/1200px-Adobe_XD_CC_icon.svg.png",
    url: "https://helpx.adobe.com/in/support/xd.html",
    display_text: "Adobe XD",
    user_id: "6",
  },
  {
    id: 17,
    web_logo: "",
    url: "https://dashboard.render.com/web/srv-ckbctb6smu8c739bd1a0/deploys/dep-ckbk95mct0pc73ejubig",
    display_text: "Backend Publisher",
    user_id: "6",
  },
  {
    id: 18,
    web_logo:
      "https://www.scilifelab.se/wp-content/uploads/2020/06/some_covid-19_dataportal-e1591174136827-scaled.jpg",
    url: "https://tejcovidportal.ccbp.tech/",
    display_text: "CovidPortal",
    user_id: "6",
  },
  {
    id: 19,
    web_logo:
      "https://th.bing.com/th/id/OIP.beF0LQZdjjqKe1RbkBTO9AHaHa?pid=ImgDet&rs=1",
    url: "https://in.pinterest.com/",
    display_text: "Pinterest",
    user_id: "6",
  },
  {
    id: 20,
    web_logo:
      "https://th.bing.com/th/id/OIP.XyL4lef0-rLfY8s5RThAxQAAAA?pid=ImgDet&rs=1",
    url: "https://tejasjobby.ccbp.tech/lo",
    display_text: "Jobby App",
    user_id: "6",
  },
  {
    id: 21,
    web_logo:
      "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/ecommerce-website-logo-img.png",
    url: "https://shritejas.ccbp.tech/",
    display_text: "ecommerce website static",
    user_id: "6",
  },
  {
    id: 22,
    web_logo: "http://localhost:3004/bookmark",
    url: "https://special-aspen-266.notion.site/Video-Submission-Task-Aids-0d8108dc38384f6b96abcba18127ccd8",
    display_text: "Video Task Question",
    user_id: "6",
  },
  {
    id: 23,
    web_logo:
      "https://th.bing.com/th?id=ODLS.f99834e8-2b37-4f06-9740-a3d17333c065&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",
    url: "https://mockapi.io/projects",
    display_text: "Mock API",
    user_id: "6",
  },
  {
    id: 24,
    web_logo:
      "https://th.bing.com/th/id/OIP.CG8qTeTuoei796LdScT2bwHaIP?pid=ImgDet&rs=1",
    url: "https://www.w3schools.com/postgresql/index.php",
    display_text: "postgre cmd",
    user_id: "6",
  },
  {
    id: 25,
    web_logo: "https://assets.ccbp.in/frontend/react-js/iot-developer-img.png",
    url: "https://tejasji.ccbp.tech/",
    display_text: "Profile Design",
    user_id: "6",
  },
  {
    id: 26,
    web_logo:
      "https://th.bing.com/th/id/OIP.xiQopRWmgdA7C-iMfkndgwHaB5?w=289&h=89&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    url: "https://tejasportfolio.ccbp.tech/",
    display_text: "Portfolio",
    user_id: "6",
  },
  {
    id: 27,
    web_logo: "pngwing",
    url: "https://www.pngwing.com/",
    display_text: "Pngwing",
    user_id: "12",
  },
  {
    id: 28,
    web_logo:
      "https://uploads-ssl.webflow.com/62d7fe1056b8482b9ecfa056/63ef599eec655ed5740d9755_logo.svg",
    url: "https://discoverdollar.webflow.io/#calc",
    display_text: "Discover Doller",
    user_id: "6",
  },
  {
    id: 29,
    web_logo: "https://fakestoreapi.com/icons/logo.png",
    url: "https://fakestoreapi.com/docs",
    display_text: "Fake Api",
    user_id: "6",
  },
  {
    id: 30,
    web_logo: "https://some",
    url: "https://www.webpagetest.org/",
    display_text: "Web Page Test",
    user_id: "6",
  },
  {
    id: 31,
    web_logo:
      "https://th.bing.com/th/id/OIP.hxf2uTNGSshD7ZzKAURnmwHaHa?pid=ImgDet&rs=1",
    url: "https://tej5todo.ccbp.tech/",
    display_text: "Local Todo",
    user_id: "6",
  },
  {
    id: 32,
    web_logo: "https://docs.python.org/3.11/_static/py.svg",
    url: "https://docs.python.org/3.11/contents.html",
    display_text: "python 3.11 docs",
    user_id: "6",
  },
];

const newBookmsrk = bookmarks.filter(each => each.url.includes('ccbp'))

console.log(newBookmsrk)

export default bookmarks;

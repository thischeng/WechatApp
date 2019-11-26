const API_BASE = "http://127.0.0.1:8000";


module.exports = {
  Shell: API_BASE + "/api/shell/",   //书架根地址
  Library: API_BASE + "/api/book/",  //书库根地址
  Search_Book: API_BASE + "/api/shell/searchBook/",
  Search_Shell: API_BASE + '/api/shell/searchBook/',  //在书架上查找书籍
  API_BOOK_DETAIL: API_BASE + "/api/shell/pk/bookDetail",
  Verify_Token: API_BASE + "/verify/",                   //验证token是否合法
  Refresh_Token : API_BASE + "/refresh/",               //刷新token的时间
  Get_Token: API_BASE + "/loginOrCreate/",            //获取该账户维持登录的token
  Get_allBook: API_BASE + "/api/shell/getAllBook/",   //获取该账户下所拥有书籍
  Search_Library: API_BASE +"/api/book/searchBook/",  //在书库中查找书籍
  Refresh_BookInfo:API_BASE +'/api/shell/',
  Book_Detail: API_BASE +'/api/shell/',
  Save_Book: API_BASE + '/api/shell/',        //图书入架
  Search_FroIsbn: API_BASE +'/api/book/forIsbn/',   //通过isbn搜索书库中书籍
  Count_Book: API_BASE + '/api/shell/countBook', //统计在架书籍总数
  BookInShell: API_BASE + '/api/shell/bookInShell', //查询在架书籍
  BookInAuthor: API_BASE + '/api/shell/bookInAuthor',  //该作者所著书籍
}
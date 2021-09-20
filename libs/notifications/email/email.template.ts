export const emailTemplate = (title: string, body: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html>
   <head>
    <title>${title}</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width" name="viewport"/>
    <style type="text/css">
        body {
            width:100%;
            height:100%;
            margin:0;
            background-color:white;
            font-family:sans-serif;
        }

        .main {
            background-color:#f5f5f5;
            padding: 2rem;
            text-align:center;
            margin-top: 3.25rem;
        }

        h1 { color:#008800; }

        .logo {
            width: 5rem;
        }

        .container {
            background: white;
            margin: 1.25rem auto;
            padding: 1.25rem;
            width: 50rem;
        }

        .content {
            font-size: 1.25rem;
        }

        .footer {
            margin-top: 2rem;
            text-align: end;
        }
    </style>
   </head>
   <body>
    <div class="main">
     <div><img src="cid:logo"/></div>
     <div class="container">
       <h1>${title}</h1>
       <div class="content">${body}</div>
       <div class="footer">
        <div>github: <a href="https://github.com/zlq4863947/triangular-arbitrage2" target="_blank">triangular-arbitrage2</a></div>
        <div>email: <a href="mailto:support@aitrade.ga" target="_blank">support@aitrade.ga</a></div>
       </div>
     </div>
    </div>
   </body>
  </html>
  `;

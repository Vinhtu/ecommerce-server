const nodemailer = require("nodemailer");
const mailConfig = require("../../config/mail");
require("../style.css");
require("dotenv/config");



exports.OrderComplete= (data) => {
  const content = `
  
   
  <html ⚡4email>
  <head>
    <meta charset="utf-8">
    <style amp4email-boilerplate>body{visibility:hidden}</style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  </head>
  <style>
  .title{
color: red;
  }
  </style>
  <body>

 
 </div>

    <div  style="width: 100%">
      <div
         style="
          width:  800px ;
          margin:  auto auto  ;
        "
      >
        <div
           style="
            width:  800px ;
            margin:  24px auto  ;
            border-radius: 3px ;
            border: 1px solid #D3D3D3;
          "
        >


        <table class="m_8127164231630417873header" lang="header" cellpadding="0" cellspacing="0" width="100%" border="0" style="width:100%">
    <tbody>
	<tr>
		<td width="100%" height="50" valign="middle" bgcolor="#FFFFFF" style="background:#ffffff;height:50px">
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<tbody><tr>
					<td align="center" width="150">
                    <a href="http://localhost:3000" style=" text-decoration: none">
         
                    <p
                       style=" font-size: 14px;font-weight: bold ;  color: rgb(16, 185, 129);  padding:  16px 8px  ;cursor:  pointer "
                    >
                      Trang chủ
                    </p>
                    </a>
					</td>
					<td align="center" width="150">
                    <a href="http://localhost:3000/voucher" style=" text-decoration: none">
                    <p
                    style=" font-size: 14px;font-weight: bold ;  color: rgb(16, 185, 129);  padding:  16px 8px  ;cursor:  pointer "
                    >
                      Nhận voucher
                    </p>
                    </a>
					</td>
					<td align="center" width="150">
                    <a href="http://localhost:3000/" style=" text-decoration: none">
                    <p
                    style=" font-size: 14px;font-weight: bold ;  color: rgb(16, 185, 129);  padding:  16px 8px  ;cursor:  pointer "
                    >
                      Top sale
                    </p>
                    </a>
					</td>
					<td align="center" width="150">
                    <a href="http://localhost:3000" style=" text-decoration: none">
                    <p
                    style=" font-size: 14px;font-weight: bold ;  color: rgb(16, 185, 129);  padding:  16px 8px  ;cursor:  pointer "
                    >
                      Sản phẩm liên quan
                    </p>
                    </a>
					</td>
				</tr>
			</tbody></table>
        </td>
    </tr>
</tbody></table>





        
          <div align="center">
            <img
              src="https://i.pinimg.com/736x/65/c4/9e/65c49ea860d0a6ce361b44d11e8924f2.jpg"
               style=" width: 150px ; height: 120px ; border-radius: 50 "
            />
          </div>

          <div  style=" padding: 24px ">
            <div  align="center">
              <p
                 style="
                
                  color: rgb(16, 185, 129) ;
                  font-size: 24px ;
                  margin-top: 0 ;
                "
              >
                Đã giao hàng !
              </p>
            </div>
            <div>
              <p  style=" margin-bottom: 16px ">Xin chao vinh tu ,</p>

              <p  style=" margin-bottom: 16px ; font-size: 14px ">
             Cảm ơn quý khách đã ghé thăm cửa hàng.
               
              </p>
              
            </div>
          </div
          <div
          style="
          display: flex ;
          justify-content: space-between;
          padding: 24px;
        "
        >
        <div style=" border: 1px solid red; padding: 15px; display:flex; align-items: center; margin-right: 16px; border-radius: 10px">
           <img style="width: 50px; height: 50px; margin: auto 16px auto 0px" src="https://rubiktheme.com/demo/rb_mercado_demo/modules/blockreassurance/views/img//reassurance/pack2/security.svg" />
           <div>
              <p style="font-size: 18px; font-weight: bold ; margin-bottom: 8px; margin-top:  0px !important;">Bước 1 </p>
              <p style="font-size: 14px; font-weight: 100; margin-bottom: 0px; margin-top: 8px">Nhận đơn và đóng gói </p>
           </div>
        </div>


        <div style=" border: 1px solid red; padding: 15px; display:flex; align-items: center; margin-right: 16px;  border-radius: 10px">
        <img style="width: 50px; height: 50px; margin: auto 16px auto 0px" src="https://rubiktheme.com/demo/rb_mercado_demo/modules/blockreassurance/views/img//reassurance/pack2/carrier.svg" />
        <div>
           <p style="font-size: 18px;font-weight: bold ; margin-bottom: 8px; margin-top: 0px !important;">Bước 2 </p>
           <p style="font-size: 14px; font-weight: 100; margin-bottom: 0px; margin-top: 8px">Nhận đơn và đóng gói </p>
        </div>
     </div>
     <div style=" border: 1px solid red; padding: 15px; display:flex; align-items: center;  border-radius: 10px">
     <img style="width: 50px; height: 50px; margin: auto 16px auto 0px" src="https://rubiktheme.com/demo/rb_mercado_demo/module…ssurance/views/img//reassurance/pack2/hotline.svg" />
     <div>
        <p style="font-size: 18px; font-weight: bold ; margin-bottom: 8px; margin-top:  0px !important;">Bước 3 </p>
        <p style="font-size: 14px; font-weight: 100; margin-bottom: 0px; margin-top: 8px">Nhận đơn và đóng gói </p>
     </div>
  </div>

  </div>



  

          <div>
             
          </div>


       
        
          <div  style=" padding: 24px ">
           
           
            <div  align="center" >
            <div
            align="center" 
               style="
                display: flex ;
                padding-top: 16px ;
                justify-content:center;
              "
            >
            <a href="http://localhost:3000/account" style="text-decoration: none;   margin: auto">
              <div   
                 style="
                  width: 200px ;
                  margin-right: 8px ;
                  border-radius: 2px ;
                  padding: 12px 25px!important;
                  background-color: #ff502f ;
                
                "
              >
                <p  style=" font-size: 12px ; color: white ; text-align:center; margin: 0px">Đánh giá đơn hàng</p>
              </div>
              </a>
              
            </div>
            </div>
          </div>
        </div>
        <div  style=" padding: 24px ">
          <div
           align="center"
          >
            <p
               style="
                font-size: 28px ;
                color: #348498 ;
                margin: 0px ;
              "
            >
              Store Shoes
            </p>
            <p  style=" font-size: 12px ">
              0283-458-999 ; 350 phuong Tan Uyen ; thi xa Ben Cat ; tinh Binh Duon
            </p>
          </div>
          <p  style=" font-size: 14px ; color: #348498 ">
            *** Day chi la thu thong bao  ; vui long khong tra loi thu nay.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
  
    `;
  return content;
};

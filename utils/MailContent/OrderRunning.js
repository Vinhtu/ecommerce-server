const nodemailer = require("nodemailer");
const mailConfig = require("../../config/mail");
require("../style.css");
require("dotenv/config");

exports.OrderRuning = (data) => {
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
                Đơn hàng đang vận chuyển
              </p>
            </div>
            <div>
              <p  style=" margin-bottom: 16px ">Xin chao vinh tu ,</p>

              <p  style=" margin-bottom: 16px ; font-size: 14px ">
              Đơn hàng đang trong quá trình vận chuyển , vui lòng giữ liên lạc để nhận cuộc gọi từ người giao hàng
               
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

        
        <div >
          
        </div>


        <div >
       
       
     </div>
     <div >
    
  </div>

  </div>



  

          <div>
             
          </div>


          <div
          style="
           display: flex ;
           padding: 10px 24px;
           margin-bottom: 8px ;
           background-image: url("https://ci6.googleusercontent.com/proxy/kozFd-5wBSeG9k44hZTE7pLKg4r8Z85tWseOPIxlSjwYda1_vWGOHoUQHcYs2LwodwY9TMwl1of_hZkUwN7gv05aOJTDC1hqoV7ocwrtZz1ZiloVuEClVMF3p3q-KNR4Rsnay1QUHVUv_rfKQf3aag6kmogX=s0-d-e1-ft#http://static.cdn.responsys.net/i5/responsysimages/lazada/contentlibrary/!images/ic-your-order.png");
  
         "
       >
    
         <span  style=" font-size: 14px; font-weight: bold ;  margin-right: 8px; margin-left: 24px">Tổng tiền: </span>
         <span  style=" font-size: 14px ">
          ${
            data?.t_price
          }
         </span>
       </div>
          <div
          style="
           display: flex ;
           padding: 10px 24px;
           margin-bottom: 8px ;
           background-image: url("https://ci6.googleusercontent.com/proxy/kozFd-5wBSeG9k44hZTE7pLKg4r8Z85tWseOPIxlSjwYda1_vWGOHoUQHcYs2LwodwY9TMwl1of_hZkUwN7gv05aOJTDC1hqoV7ocwrtZz1ZiloVuEClVMF3p3q-KNR4Rsnay1QUHVUv_rfKQf3aag6kmogX=s0-d-e1-ft#http://static.cdn.responsys.net/i5/responsysimages/lazada/contentlibrary/!images/ic-your-order.png");
  
         "
       >
    
         <span  style=" font-size: 14px; font-weight: bold ;  margin-right: 8px; margin-left: 24px">Dia chi: </span>
         <span  style=" font-size: 14px ">
          ${
            data?.wardCommunedistrictAddress +
            " " +
            data?.wardCommunedistrictAddress +
            " " +
            data?.streetAddress +
            " " +
          
            data?.zipAddress
          }
         </span>
       </div>
       <div
          style="
           display: flex ;
           padding: 10px 24px;
           margin-bottom: 8px ;
           background-image: url("https://ci6.googleusercontent.com/proxy/kozFd-5wBSeG9k44hZTE7pLKg4r8Z85tWseOPIxlSjwYda1_vWGOHoUQHcYs2LwodwY9TMwl1of_hZkUwN7gv05aOJTDC1hqoV7ocwrtZz1ZiloVuEClVMF3p3q-KNR4Rsnay1QUHVUv_rfKQf3aag6kmogX=s0-d-e1-ft#http://static.cdn.responsys.net/i5/responsysimages/lazada/contentlibrary/!images/ic-your-order.png");
      
         "
       >

         <span  style=" font-size: 14px; font-weight: bold ; margin-right: 8px; margin-left: 24px ">Thanh toan: </span>
         <span  style=" font-size: 14px ">
          ${data?.type_pay} (${data?.status_pay})
         </span>
       </div>
          <div
             style=" width: 100% ; height: 1px ; background-color: #F5F4F3; margin-top: 16px "
          ></div>

          ${data?.orderitem.map(
            (item) =>
              ` <div>
                <div  style=" padding: 24px ">
                 
                  <div
                     style="
                      display: flex ;
                      margin-bottom: 8px ;
                      font-weight: bold
                    "
                  >
 
                    <span  style=" font-size: 14px ">Kien hang</span>
                  </div>
                  <div  style=" display: flex ; margin-bottom: 16px ">
                    <p  style=" font-size: 12px ; margin-right: 24px; margin-top: 0px ">
                      Danh muc: ${item.product.category}
                    </p>
                    <p  style=" font-size: 12px; margin-top: 0px ">Thuong hieu: ${
                      item.product.brand
                    }</p>
                  </div>
                  <div  style=" display: flex ; margin-bottom: 8px;  margin-top: 0px ">
                    <div  style=" margin-right: 24px ">
                      <img
                         style=" width: 120px ; height: 120px "
                        src=${item.product.thumbnail}
                      />
                    </div>
                    <div>
                      <p
                         style=" font-size: 14px ; margin-top: 0px ; margin-bottom: 8px "
                      >
                      ${item.product.name}
                      </p>
                      <p
                         style="
                          color: #ff502f;
                          font-size: 12px ;
                          margin-top: 0px ;
                          margin-bottom: 8px ;
                        "
                      >
                      ${item.price}
                        <span  style=" color: black ; margin-left: 16px ">
                          X ${item.amount}
                        </span>
                      </p>

                      <p
                         style=" font-size: 12px ; margin-top: 0px ; margin-bottom: 8px "
                      >
                        Ship :  ${item.ship}
                      </p>
                      <p
                         style=" font-size: 12px ; margin-top: 0px ; margin-bottom: 8px "
                      >
                        Voucher :
                        <span
                           style="
                            color: #ff502f ;
                          "
                        >
                          0 vnd
                        </span>
                      </p>
                      <p
                         style=" font-size: 12px ; margin-top: 0px ; margin-bottom: 8px "
                      >
                        Tong tien :  ${
                          parseInt(item.price) * parseInt(item.amount) +
                          parseInt(item.ship)
                        } vnd
                      </p>
                    </div>
                  </div>
                </div>
                <div
                   style="
                    width: 100% ;
                    height: 1px ;
                    background-color: #F5F4F3 ;
                  "
                ></div>
              </div>`
          )}
          <div  style=" padding: 24px ">
            <div
               style="
                display: flex ;
                margin-bottom: 16px ;
              "
            >
              <span  style=" font-size: 18px ">***Lưu ý</span>
            </div>
            <p  style=" font-size: 14px ">
              Trong quá trình chờ đợi nếu có vấn đề về đơn hàng hãy liên hệ trực tiếp với chúng tôi
            </p>
            <div  align="center" >
            <div
            align="center" 
               style="
                display: flex ;
                padding-top: 16px ;
                justify-content:center;
              "
            >
            <a href="v.v" style="text-decoration: none;   margin: auto 8px auto auto">
              <div   
                 style="
                  width: 200px ;
                  margin-right: 8px ;
                  border-radius: 2px ;
                  padding: 12px 25px!important;
                  background-color: #ff502f ;
                
                "
              >
                <p  style=" font-size: 12px ; color: white ; text-align:center; margin: 0px">Tư vấn miễn phí</p>
              </div>
              </a>
              <a href="v.v" style="text-decoration: none; margin: auto auto auto 8px">
              <div
             
                 style="
                  width: 200px ;
                  padding: 12px 25px!important;
                  margin-right: 8px ;
                  border-radius: 2px ;
                  background-color: rgb(16, 185, 129) ;
                "
              >
                <p  style=" font-size: 12px ; color: white ; text-align:center; margin: 0px">
                  Các câu hỏi thường gặp
                </p>
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

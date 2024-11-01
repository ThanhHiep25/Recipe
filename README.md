<h2>Weather App</h2>
        <h3>Demo project: https://weather-app-linezz.netlify.app</h3>
        <h3>Openweathermap: https://openweathermap.org</h3>
        <h3>Mô tả</h3>
        <p>Input : <i>lưu ý nhập không dấu, có một số địa điểm sẽ hỗ trợ có dấu (Bạn có thể sửa lại hàm để thêm có dấu hoặc sử dụng api khác)</i></p>
        <img src= "https://github.com/user-attachments/assets/a4951d85-f3eb-44c4-9562-d945e15e7e9e"/> 
        <br>
        <br>    
        <p>Kết quả trả về </p>
        <img src="https://github.com/user-attachments/assets/7dc33c4a-4585-4443-a3fb-20e0ea910a95"/>
        <br>
        <br>
        <p>Sửa lại APIKey cá nhân :</p>

        const APIKey = "APIKey cá nhân";

 <p>Lấy thông tin về thời tiết và cập nhật giao diện</p>

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");
<p>Cập nhật hình ảnh dựa trên tình trạng thời tiết</p>

            switch (json.weather[0].main) {
            case "Clear":
              image.src = "images/clear.png";
              break;
            case "Rain":
              image.src = "images/rain.png";
              break;
            case "Snow":
              image.src = "images/snow.png";
              break;
            case "Clouds":
              image.src = "images/cloud.png";
              break;
            case "Haze":
              image.src = "images/mist.png";
              break;
            default:
              image.src = "";
          }



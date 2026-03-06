/**
 * HỆ THỐNG RENDER SẢN PHẨM TỰ ĐỘNG - SHOP BÀY HÀNG
 * Tự động lấy dữ liệu, đánh số thứ tự và hiển thị
 */

const tuDo = document.getElementById("Hang-moi");
// Link CSV từ Sheet TONG_HOP (Gộp dữ liệu từ 30+ người)
const linkCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFCL1NiCeMNUGWbtkzgUgsQIdhjbASXoard37mTu0QQQFxUr1YjI7PSsMNdjDu2hRydSWbx-Ezaypa/pub?gid=0&single=true&output=csv";

async function layHangTuSheet() {
    try {
        const response = await fetch(linkCSV);
        const data = await response.text();
        
        // Tách dòng và loại bỏ các dòng tiêu đề (slice(2) nếu sheet có 2 dòng đầu là tiêu đề)
        const dong = data.split("\n").slice(2); 

        let html = `
            <h2 style="text-align:center; margin: 30px 0; font-family: Arial, sans-serif; color: #333;">
                ✨ DANH SÁCH SẢN PHẨM BÀY HÀNG ✨
            </h2>
            <div style="display:flex; flex-wrap:wrap; justify-content:center; gap: 20px; padding: 10px;">
        `;

        let stt = 1; // Khởi tạo số thứ tự

        dong.forEach(row => {
            // Sử dụng Regex để tách CSV chuẩn hơn (tránh lỗi khi trong tên có dấu phẩy)
            const cot = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            if (cot.length >= 5) {
                const ten = cot[0] ? cot[0].replace(/"/g, "").trim() : "";   // Cột A: Tên SP
                const anh = cot[1] ? cot[1].replace(/"/g, "").trim() : "";   // Cột B: Link Ảnh
                const gia = cot[2] ? cot[2].replace(/"/g, "").trim() : "";   // Cột C: Giá
                const link = cot[3] ? cot[3].replace(/"/g, "").trim() : "";  // Cột D: Link Mua
                const bat = cot[4] ? cot[4].replace(/"/g, "").trim() : "";   // Cột E: Trạng thái (1 là hiện)

                // Chỉ hiển thị khi thỏa mãn điều kiện
                if (bat === "1" && ten !== "") {
                    html += `
                        <div style="border:1px solid #eee; width:200px; border-radius:15px; text-align:center; box-shadow: 0 4px 8px rgba(0,0,0,0.05); background: #fff; overflow: hidden; transition: 0.3s; position: relative;">
                            <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: #fff; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold;">
                                STT: ${stt}
                            </div>
                            
                            <img src="${anh}" style="width:100%; height:180px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/200x180?text=Hinh-Anh-Loi'">
                            
                            <div style="padding: 15px;">
                                <h4 style="font-size:14px; height:36px; margin: 0 0 10px 0; color: #444; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                                    ${ten}
                                </h4>
                                <p style="color:#ee4d2d; font-weight:bold; font-size: 16px; margin-bottom: 12px;">${gia}</p>
                                <a href="${link}" target="_blank" style="display: block; background:#fb5531; color:white; padding:8px 0; text-decoration:none; border-radius:8px; font-size:13px; font-weight: bold; transition: 0.3s;">
                                    Mua ngay
                                </a>
                            </div>
                        </div>
                    `;
                    stt++; // Tăng số thứ tự sau mỗi sản phẩm được hiện
                }
            }
        });

        html += "</div><div style='text-align:center; padding: 20px; color: #888;'>--- Hết danh sách ---</div>";
        tuDo.innerHTML = html;

    } catch (loi) {
        console.error("Lỗi hệ thống:", loi);
        tuDo.innerHTML = "<p style='text-align:center;'>Đang cập nhật dữ liệu từ hệ thống...</p>";
    }
}

// Khởi chạy
layHangTuSheet();

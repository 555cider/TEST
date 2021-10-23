// 이미지 클릭 시, 지역구 선택
districtImgList = document.querySelectorAll(".district-img");
for (let i = 0; i < districtImgList.length; i++) {
  districtImgList[i].addEventListener("click", e => {
    districtGu.value = e["srcElement"]["title"];
    postDistrictGu();
  });
}
btnReset.addEventListener("click", e => {
  districtGu.value = "";
  districtDong.innerHTML = "";
  menuMain.value = "";
  menuSub.innerHTML = "";
})

// 지역(구) 클릭 시, 지역(구) 목록
// districtGu.addEventListener("click", getDistrictGu);
// function getDistrictGu() {
//   districtGu.innerHTML = ""
//   $.ajax({
//     type: 'GET',
//     url: '/category/district-gu',
//     dataType: 'JSON',
//     success: function (response) {
//       const guList = response["districtGuList"];
//       for (let i = 0; i < guList.length; i++) {
//         districtGu.innerHTML += `<option value="${guList[i]}">${guList[i]}</option>`;
//       }
//     },
//     error: function (xtr, status, error) {
//       alert(xtr + ":" + status + ":" + error);
//     }
//   });
// }

// 지역(구) 선택 시, 지역(동) 목록 갱신
districtGu.addEventListener("change", postDistrictGu);
function postDistrictGu() {
  districtDong.innerHTML = "";
  $.ajax({
    type: 'POST',
    url: '/category/district-gu',
    data: {
      districtGu: districtGu.value
    },
    dataType: 'JSON',
    success: function (response) {
      const dongList = response["districtDongList"];
      for (let i = 0; i < dongList.length; i++) {
        districtDong.innerHTML += `<option value="${dongList[i]}">${dongList[i]}</option>`;
      }
    },
    error: function (xtr, status, error) {
      alert(xtr + ":" + status + ":" + error);
    }
  });
}

// 메뉴(메인) 선택 시, 메뉴(메인) 목록
// menuMain.addEventListener("click", getMenuMain);
// function getMenuMain() {
//   menuMain.innerHTML = "";
//   $.ajax({
//     type: 'GET',
//     url: '/category/menu-main',
//     dataType: 'JSON',
//     success: function (response) {
//       const mainList = response["menuMainList"];
//       for (let i = 0; i < mainList.length; i++) {
//         menuMain.innerHTML += `<option value="${mainList[i]}">${mainList[i]}</option>`;
//       }
//     },
//     error: function (xtr, status, error) {
//       alert(xtr + ":" + status + ":" + error);
//     }
//   });
// }

// 메뉴(메인) 선택 시, 메뉴(서브) 목록 갱신
menuMain.addEventListener("change", postMenuMain);
function postMenuMain() {
  menuSub.innerHTML = "";
  $.ajax({
    type: 'POST',
    url: '/category/menu-main',
    data: {
      menuMain: menuMain.value
    },
    dataType: 'JSON',
    success: function (response) {
      const subList = response["menuSubList"];
      for (let i = 0; i < subList.length; i++) {
        menuSub.innerHTML += `<option value="${subList[i]}">${subList[i]}</option>`;
      }
    },
    error: function (xtr, status, error) {
      alert(xtr + ":" + status + ":" + error);
    }
  });
}

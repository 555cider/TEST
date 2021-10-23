btnFilter.addEventListener("click", postFilter);
function postFilter() {
  tblRestaurant.innerHTML = `
      <tr>
        <th class="col-6">업체명</th>
        <th class="col-3">지역</th>
        <th class="col-3">메뉴</th>
      </tr>
    `;
  $.ajax({
    type: 'POST',
    url: '/search',
    data: {
      chk: (rdbMenu.checked ? 1 : 0) + (rdbDistrict.checked ? 2 : 0),
      menu: menuSub.value === 0 ? menuMain.value : `${menuMain.value} > ${menuSub.value}`,
      district: districtDong.value === 0 ? districtGu.value : `${districtGu.value} ${districtDong.value}`,
    },
    dataType: 'JSON',
    success: function (response) {
      // setChart(response["chart_data"], response["total"]);
      response["result"].forEach(e => {
        tblRestaurant.innerHTML += `
            <tr>
              <td>${e["NAME"]}</td>
              <td>${e["DISTRICT_GU"]} \> ${e["DISTRICT_DONG"]}</td>
              <td>${e["MENU_MAIN"]} \> ${e["MENU_SUB"]}</td>
            </tr>
          `;
      });
    },
    error: function (xtr, status, error) {
      alert(xtr + ":" + status + ":" + error);
    }
  });
};
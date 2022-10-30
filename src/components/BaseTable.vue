<template>
    
      <thead>
        <tr>
          <th class="text-align-center">
            <input id="choose-all" type="checkbox" />
          </th>
          <th
            class="text-align-left"
            fieldname="EmployeeCode"
            style="min-width: 140px"
          >
            Mã nhân viên
          </th>
          <th
            class="text-align-left"
            fieldname="EmployeeName"
            style="min-width: 200px"
          >
            Tên nhân viên
          </th>
          <th
            class="text-align-left"
            fieldname="Gender"
            style="min-width: 129px"
          >
            Giới tính
          </th>
          <th
            class="text-align-center"
            style="min-width: 120px"
            fieldname="DateOfBirth"
          >
            Ngày sinh
          </th>
          <th
            class="text-align-left"
            title="Số chứng minh nhân dân"
            fieldname="IdentityNumber"
            style="min-width: 130px"
          >
            Số CMND
          </th>
          <th
            class="text-align-left"
            style="min-width: 150px"
            fieldname="EmployeePosition"
          >
            Chức danh
          </th>
          <th
            class="text-align-left"
            fieldname="DepartmentName"
            style="min-width: 150px"
          >
            Tên đơn vị
          </th>
          <th
            class="text-align-left"
            style="min-width: 130px"
            fieldname="BankAccountNumber"
          >
            Số tài khoản
          </th>
          <th
            class="text-align-left"
            style="min-width: 150px"
            fieldname="BankName"
          >
            Tên ngân hàng
          </th>
          <th
            class="text-align-left"
            style="min-width: 200px"
            fieldname="BankBranchName"
          >
            Chi nhánh ngân hàng
          </th>
          <th class="text-align-center" style="min-width: 110px">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for ="(item,index) in list" :key="index">
          <td class="text-align-center">
            <input type="checkbox" name="choose" class="m-input-checkbox"/>
          </td>
          <td class="text-align-left">{{item.EmployeeCode}}</td>
          <td class="text-align-left">{{item.EmployeeName}}</td>
          <td class="text-align-left">{{item.DateOfBirth}}</td>
          <td class="text-align-left">{{item.GenderName}}</td>
          <td class="text-align-left">{{item.DepartmentName}}</td>
          <td class="text-align-left">{{item.EmployeePosition}}</td>
          <td class="text-align-left">{{item.IdentityNumber}} </td>
          <td class="text-align-left">{{item.BankAccountNumber}}</td>
          <td class="text-align-left">{{item.BankName}}</td>
          <td class="text-align-left">{{item.BankBranchName}}</td>
          <td class="text-align-center show-contexMenu" style="z-index: 2">
            <div class="function-col">
              <div class="function-col__update">
                <button class="btn-edit-epl" data-id="${employeeCode}">
                  Sửa
                </button>
              </div>
              <div class="function-col__menu m-ml-8">
                <button>
                  <div class="m-icon-16 m-icon-arrow-down-blue"></div>
                </button>
                <div class="child-multi-choices" style="min-width: 120px">
                  <div class="duplication m-chil-dd">Nhân bản</div>
                  <div class="delete-epl m-chil-dd" data-id="${employeeCode}">
                    Xóa
                  </div>
                  <div class="pause m-chil-dd">Ngưng sử dụng</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table><table class="m-table" id="listEmployees">
</template>
<script>
export default {
  name: "BaseTable",
  props: ["apiUrl"],
  created() {
    //Lấy dữ liệu về
    fetch(this.apiUrl)
    .then(res=>res.json())
    .then(res=>{this.list = res})
  },
  data() {
    return {
      list:[]
    };
  }
};
</script>
<style>
</style>
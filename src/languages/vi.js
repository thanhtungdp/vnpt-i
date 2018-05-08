export default {
  dashboard: {
    good: 'Good',
    dataLoss: 'Mất dữ liệu',
    notUse: 'Chưa hoạt động',
    exceeded: 'Vượt ngưỡng',
    exceededPreparing: 'Chuẩn bị vượt',
    exceededTendency: 'Xu hướng vượt'
  },
  monitoring: {
    group: 'Nhóm',
    ungroup: 'Bỏ nhóm',
    sortByStationName: 'Sắp xếp theo tên',
    sortByValues: 'Sắp xếp theo giá trị',
    limit: 'Giới hạn',
    keywordSearch: 'Tìm kiếm từ khóa',
    selectGroup: 'Sắp xếp',
    selectOrder: 'Sắp xếp thứ tự theo',
    selectSationType: 'Loại trạm',
    dataSearch: 'Tra cứu số liệu',
    viewInMap: 'Xem trên bản đồ',
    samPling: 'Lấy mẫu',
    camera: 'Camera theo dõi'
  },
  error: {
    require: 'Require',
    email: 'Invalid email address'
  },
  form: {
    save: 'Lưu',
    update: 'Cập nhật'
  },
  Role: {
    form: {
      name: {
        label: 'Name',
        placeholder: 'Input Name',
        error: 'Please input Name'
      },
      description: {
        label: 'Description',
        placeholder: 'Input description',
        error: 'Please input description'
      }
    }
  },
  login: {
    title: 'Đăng nhập',
    twoFactorAlert:
      '2 Factor Auth - Your code verify login send to {{=it.email}}!',
    form: {
      username: {
        label: 'Email',
        placeholder: 'user@example.com'
      },
      password: {
        label: 'Mật khẩu',
        placeholder: '********'
      },
      twoFactor: {
        label: 'Verify code',
        placeholder: 'xxxx'
      },
      buttonLogin: 'Login',
      buttonTwoFactor: 'Verify'
    }
  },
  changePassword: {
    form: {
      oldPassword: {
        error: 'Please input old password!'
      },
      newPassword: {
        error: 'Please input new password!'
      },
      newPasswordConfirmation: {
        error: 'Please input new password confirmation!',
        error1: "Password confirmation doesn't match Password"
      },
      Success: 'Change password successfully'
    }
  },
  measuringManager: {
    list: {
      title: 'Measuring'
    },
    create: {
      success: 'Add measuring success!',
      keyExisted: 'Measuring code is existed!'
    },
    edit: {
      success: 'Update measuring success!'
    },
    form: {
      key: {
        label: 'Code',
        placeholder: 'Input measuring code',
        error: 'Please input measuring code!'
      },
      name: {
        label: 'Name',
        placeholder: 'Input measuring name',
        error: 'Please input measuring name!'
      },
      unit: {
        label: 'Unit',
        placeholder: 'Input unit of measuring'
      },
      error: 'Error!'
    }
  },
  stationTypeManager: {
    list: {
      title: 'Station type'
    },
    create: {
      success: 'Add station type success!',
      keyExisted: 'Station type code is existed!'
    },
    edit: {
      success: 'Update station type success!'
    },
    form: {
      key: {
        label: 'Code',
        placeholder: 'Input station type code',
        error: 'Please input station type code!'
      },
      name: {
        label: 'Name',
        placeholder: 'Input station type name',
        error: 'Please input station type name!'
      },
      icon: {
        label: 'Icon'
      },
      auto: {
        label: 'Auto'
      },
      error: 'Error!'
    }
  },
  stationAutoManager: {
    list: {
      title: 'Station auto'
    },
    create: {
      success: 'Add station auto success!',
      keyExisted: 'Station auto code is existed!'
    },
    edit: {
      success: 'Update station auto success!'
    },
    form: {
      key: {
        label: 'Code',
        placeholder: 'Input station auto code',
        error: 'Please input station auto code!'
      },
      name: {
        label: 'Name',
        placeholder: 'Input station auto name',
        error: 'Please input station auto name!'
      },
      stationType: {
        label: 'Type',
        placeholder: 'Input type'
      },
      address: {
        label: 'Address',
        placeholder: 'Address'
      },
      long: {
        label: 'Longitude',
        placeholder: 'Input longitude',
        error: 'Please input longitude'
      },
      lat: {
        label: 'Latitude',
        placeholder: 'Input latitude',
        error: 'Please input latitude'
      },
      emails: {
        label: 'Emails',
        placeholder: 'Input emails',
        error: 'Please input emails'
      },
      phones: {
        label: 'Phones',
        placeholder: 'Input phones',
        error: 'Please input phones'
      },
      measuringKey: {
        label: 'Measuring code',
        placeholder: 'Input measuring code',
        error: 'Please input measuring code'
      },
      measuringName: {
        label: 'Measuring name',
        placeholder: 'Input measuring name',
        error: 'Please input measuring name'
      },
      measuringUnit: {
        label: 'Unit',
        placeholder: 'Input unit',
        error: 'Please input unit'
      },
      measuringMinLimit: {
        label: 'Min limit',
        placeholder: 'Input min limit',
        error: 'Please input min limit'
      },
      measuringMaxLimit: {
        label: 'Max limit',
        placeholder: 'Input max limit',
        error: 'Please input max limit'
      },
      options: {
        isAllowWarning: 'Allow Warning',
        isAllowRemote: 'Allow Remote'
      },
      error: 'Error!'
    }
  },
  dataSearchFrom: {
    form: {
      stationType: {
        label: 'Station type',
        placeholder: 'Select station type'
      },
      stationAuto: {
        label: 'Station auto',
        placeholder: 'Select station auto'
      },
      fromDate: {
        label: 'From',
        placeholder: 'Select from date'
      },
      toDate: {
        label: 'To',
        placeholder: 'Select to date'
      },
      measuringList: {
        label: 'Measuring',
        placeholder: 'Select measuring',
        require: 'choose at least 1 measuring'
      },
      isExceeded: {
        label: 'Is exceeded'
      },
      operator: {
        label: 'Operator'
      },
      value: {
        label: 'Value'
      },
      type: {
        label: 'Report type'
      },
      advanced: {
        label: 'Advanced'
      },
      all: 'Tất cả'
    }
  },
  avgSearchFrom: {
    form: {
      stationType: {
        label: 'Station type',
        placeholder: 'Select station type'
      },
      stationAuto: {
        label: 'Station auto',
        placeholder: 'Select station auto'
      },
      fromDate: {
        label: 'From',
        placeholder: 'Select from date'
      },
      toDate: {
        label: 'To',
        placeholder: 'Select to date'
      },
      measuringList: {
        label: 'Measuring',
        placeholder: 'Select measuring'
      },
      isExceeded: {
        label: 'Is exceeded'
      },
      operator: {
        label: 'Operator'
      },
      value: {
        label: 'Value'
      },
      type: {
        label: 'Report type'
      },
      advanced: {
        label: 'Advanced'
      }
    },
    list: {
      receivedAt: {
        label: 'Received at'
      }
    }
  },
  warningLevels: {
    title: 'CÁC MỰC ĐỘ CẢNH BÁO',
    good: 'Tốt',
    exceedTendency: 'Xu hướng vượt',
    exceedPreparing: 'Chuẩn bị vượt',
    exceed: 'Vượt quy chuẩn'
  },
  addon: {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    onSave: {
      add: {
        success: 'Add success!',
        error: 'Add error!'
      },
      update: {
        success: 'Update success!',
        error: 'Update error'
      }
    },
    onDelete: {
      success: 'Delete success!',
      error: 'Delete error!'
    },
    search: 'Search'
  }
}

export default {
  chart: {
    all: 'All',
    time: 'Time'
  },
  dashboard: {
    good: 'Good',
    dataLoss: 'data loss',
    notUse: 'not use',
    exceeded: 'Exceeded',
    exceededPreparing: 'Exceeded preparing',
    exceededTendency: 'Exceeded tendency',
    viewInMonitoring: 'View in monitoring',
    viewInMap: 'View in map',
    viewMore: 'View More',
    tableList: {
      name: 'Name',
      dataStatus: 'Data status'
    }
  },
  monitoring: {
    group: 'Group',
    unGroup: 'UnGroup',
    sortByStationName: 'Sort by Station name',
    sortByValues: 'Sort by Values',
    limit: 'Limit',
    dataLoss: 'Data loss at',
    notUse: 'Not use',
    keywordSearch: 'Search key word',
    selectGroup: 'Select group',
    selectOrder: 'Order by',
    selectStationType: 'Station type',
    dataSearch: 'Data search',
    viewInMap: 'View in map',
    sampling: 'Sampling',
    camera: 'Camera',
    controlStationName: 'Control Station'
  },
  controlStation: {
    trigger: {
      base: 'Trigger',
      triggerSuccess: 'Trigger success',
      triggerCancel: 'Trigger cancel success',
      triggerExceeded: 'Exceeded success'
    },
    history: {
      base: 'History'
    },
    config: {
      base: 'Config',
      reset: 'Reset success',
      success: 'Config success'
    },
    handmade: 'Handmade',
    automatic: 'Automatic',
    total: 'Total',
    totalHaveTaken: 'Total have taken',
    amountToGet: 'Amount to get',
    timer: 'Timer',
    date: 'Date',
    typeControl: 'Type control',
    orderByBottle: 'Order by bottle',
    dateTime: 'Datetime',
    content: 'Content',
    email: 'Email',
    tagName: 'Tag name',
    configTotal: 'Config Total'
  },
  map: {
    menuRight: {
      good: 'Good',
      dataLoss: 'Data loss',
      notUse: 'Not use',
      exceeded: 'Exceeded',
      exceededPreparing: 'Exceeded preparing',
      exceededTendency: 'Exceeded tendency'
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
      all: 'All'
    }
  },
  avgSearchFrom: {
    form: {
      stationType: {
        label: 'Station type',
        placeholder: 'Select station type',
        error: 'Please choose station type'
      },
      stationAuto: {
        label: 'Station auto',
        placeholder: 'Select station auto',
        error: 'Please choose station auto'
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
        label: 'Report type',
        error: 'Please choose report type'
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
      numericalOrder: {
        label: 'numericalOrder',
        placeholder: 'numericalOrder'
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
      error: 'Error!',
      color: {
        label: 'color',
        placeholder: 'color'
      },
      numericalOrder: {
        label: 'numericalOrder',
        placeholder: 'numericalOrder'
      }
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
        placeholder: 'Input type',
        error: 'Please choose stationType!'
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
    },
    config: {
      fileName: {
        label: 'fileName',
        placeholder: 'fileName'
      },
      path: {
        label: 'path',
        placeholder: 'path'
      },
      measuringSrc: {
        label: 'measuringSrc',
        placeholder: 'measuringSrc'
      },
      measuringDes: {
        label: 'measuringDes',
        placeholder: 'measuringDes'
      },
      ratio: {
        label: 'ratio',
        placeholder: 'ratio'
      },
      message: {
        success: 'Update station auto config success!',
        error: 'Update station auto config fail!'
      }
    },
    options: {
      allowSendWarning: {
        label: 'Allow Send Warning',
        placeholder: 'allowSendWarning'
      },
      allowSampling: {
        label: 'Allow Sampling',
        placeholder: 'allowSendWarning'
      },
      apiAddress: {
        label: 'API Address',
        placeholder: 'allowSendWarning'
      },
      allowCamera: {
        label: 'Allow Camera',
        placeholder: 'allow Camera'
      },
      name: {
        label: 'Name',
        placeholder: 'Name'
      },
      RTSP: {
        label: 'RTSP URL',
        placeholder: 'RTSP URL'
      }
    }
  },
  userForm: {
    form: {
      userName: {
        label: 'Username',
        placeholder: 'Username'
      },
      email: {
        label: 'Email',
        placeholder: 'Email'
      },
      password: {
        label: 'Password',
        placeholder: 'Password'
      },
      confirmPassword: {
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        message: 'Please confirm your password!'
      },
      firstName: {
        label: 'FirstName',
        placeholder: 'FirstName'
      },
      lastName: {
        label: 'LastName',
        placeholder: 'LastName'
      },
      country: {
        label: 'Country',
        placeholder: 'Select Country'
      },
      organization: {
        label: 'Organization',
        placeholder: 'Select Organization'
      },
      phone: {
        label: 'Phone',
        placeholder: 'Phone'
      },
      isAdmin: {
        label: 'isAdmin'
      }
    }
  },
  userSearchFrom: {
    form: {
      userName: {
        label: 'Username',
        placeholder: 'Username'
      },
      email: {
        label: 'Email',
        placeholder: 'Email'
      },
      firstName: {
        label: 'FirstName',
        placeholder: 'FirstName'
      },
      lastName: {
        label: 'LastName',
        placeholder: 'LastName'
      },
      country: {
        label: 'Country',
        placeholder: 'Select Country'
      },
      organization: {
        label: 'Organization',
        placeholder: 'Select Organization'
      },
      phone: {
        label: 'Phone',
        placeholder: 'Phone'
      }
    }
  },
  userRule: {
    name: {
      label: 'name',
      placeholder: 'name'
    },
    address: {
      label: 'address',
      placeholder: 'address'
    },
    role: {
      label: 'role',
      placeholder: 'role'
    },
    message: {
      success: 'Update Rule User success!',
      error: 'Update Rule User fail!'
    }
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
  profileUser: {
    success: 'Change information successfully'
  },
  security: {
    breadcrumb: 'Security setting',
    label: 'Two-Factor Authentication',
    success: 'Change Two-Factor Authentication successfully'
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
  resetPassword: {
    key: 'I forgot my password',
    key2:
      "Enter your email address and we'll send you an email with introduction to reset your password",
    key3: 'Reset password',
    key4: 'Resend code',
    key5: 'Confirm',
    key6: 'Send code'
  },
  login: {
    title: 'Login',
    twoFactorAlert:
      '2 Factor Auth - Your code verify login send to {{=it.email}}!',
    form: {
      email: {
        label: 'Email',
        placeholder: 'user@example.com'
      },
      password: {
        label: 'Password',
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
  warningLevels: {
    title: 'WARNING LEVELS',
    good: 'Good',
    exceedTendency: 'Exceed tendency',
    exceedPreparing: 'Exceed preparing',
    exceed: 'Exceed'
  },
  addon: {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    reset: 'Reset',
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
    search: 'Search',
    error: 'Something went wrong!!!'
  },
  success: {
    text: 'Success'
  },
  error: {
    text: 'Erros',
    require: 'Require',
    email: 'Invalid email address'
  },
  form: {
    save: 'Save',
    update: 'Update'
  }
}

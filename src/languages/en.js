export default {
  error: {
    require: 'Require',
    email: 'Invalid email address'
  },
  form: {
    save: 'Save',
    update: 'Update'
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
  login: {
    title: 'Login',
    form: {
      email: {
        label: 'Email',
        placeholder: 'user@example.com'
      },
      password: {
        label: 'Password',
        placeholder: '********'
      },
      buttonLogin: 'Login'
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
  resetPassword: {
    key: 'I forgot my password',
    key2:
      "Enter your email address and we'll send you an email with introduction to reset your password",
    key3: 'Reset password',
    key4: 'Resend code',
    key5: 'Confirm',
    key6: 'Send code'
  },
  profileUser: {
    success: 'Change infomation successfully'
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
        label: 'allow Send Warning',
        placeholder: 'allowSendWarning'
      },
      allowSampling: {
        label: 'allow Sampling',
        placeholder: 'allowSendWarning'
      },
      apiAddress: {
        label: 'API Address',
        placeholder: 'allowSendWarning'
      },
      allowCamera: {
        label: 'allow Camera',
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
      }
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
    search: 'Search',
    error: 'Something went wrong!!!'
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
  map: {
    menuRight: {
      good: 'Good',
      dataLoss: 'Data loss',
      notUse: 'Not use',
      exceeded: 'Exceeded',
      exceededPreparing: 'Exceeded preparing',
      exceededTendency: 'Exceeded tendency'
    }
  }
}

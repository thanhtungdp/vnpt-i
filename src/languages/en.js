export default {
  chart: {
    all: 'All',
    time: 'Time'
  },
  dashboard: {
    good: 'Good',
    dataLoss: 'Loss',
    notUse: 'Not In Use',
    connected: 'Connected',
    exceeded: 'Exceeded',
    exceededPreparing: 'Almost Exceed',
    exceededTendency: 'Tend To Exceed',
    viewInMonitoring: 'View In Monitoring',
    viewInMap: 'View In Map',
    viewMore: 'View More',
    tableList: {
      name: 'Name',
      dataStatus: 'Data Status'
    }
  },
  monitoring: {
    title: 'Monitoring',
    group: 'Group',
    unGroup: 'Ungroup',
    sortByStationName: 'Sort By Station Name',
    sortByValues: 'Sort By Values',
    limit: 'Limit',
    keywordSearch: 'Search Keyword',
    selectGroup: 'Select Group',
    selectOrder: 'Order By',
    selectStationType: 'Station Type',
    dataSearch: 'Data Search',
    viewInMap: 'View In Map',
    sampling: 'Sampling',
    camera: 'Camera'
  },
  controlStation: {
    text: 'Sampling',
    breadcrumb: {
      trigger: 'Sampling',
      history: 'History',
      config: 'Config'
    },
    trigger: {
      triggerSuccess: 'Trigger Succeeded',
      triggerCancel: 'Trigger Cancel Succeeded',
      triggerExceeded: 'Exceeded Succeeded'
    },
    config: {
      reset: 'Reset Succeeded',
      success: 'Config Succeeded'
    },
    bottle: 'Bottle Number',
    handMade: 'Manual',
    automatic: 'Automatic',
    total: 'Total',
    totalHaveTaken: 'No. Of Taken Bottles',
    amountToGet: 'Quantity',
    timer: 'Timer',
    date: 'Date',
    typeControl: 'Type Of Bontrol',
    orderByBottle: 'Order By Bottle',
    dateTime: 'Date Time',
    content: 'Content',
    email: 'Email',
    tagName: 'Tag Name',
    configTotal: 'Config No. Of Total',
    cycleSampling: 'Cycle Of Sampling',
    buttonTrigger: 'Trigger',
    cancelTrigger: 'Cancel Trigger',
    triggerExceeded: 'Trigger Exceeded',
    cancelTriggerExceeded: 'Cancel Trigger Exceeded',
    statusSampling: 'Sampling ...',
    viewMore: 'View More'
  },
  map: {
    mapOverview: 'Map Overview',
    AQI: 'AQI',
    WQI: 'WQI',
    menuRight: {
      good: 'Good',
      dataLoss: 'Data Loss',
      notUse: 'Not In Use',
      connected: 'Connected',
      exceeded: 'Exceeded',
      exceededPreparing: 'Almost Exceed',
      exceededTendency: 'Tend To Exceed',
      notify: 'Notifications',
      noData: 'No Data Available',
      dataStatus: 'Data Status',
      stationStatus: 'Station Status'
    },
    menuLeft: {
      stationSearch: 'Search By Station'
    },
    dataTable: {
      measuring: 'Measuring',
      value: 'Value',
      unit: 'Unit',
      dataLossAt: 'Data Lost At:',
      dataReceived: 'Received At:',
      longitude: 'Longitude',
      latitude: 'Latitude',
      address: 'Address',
      viewMore: {
        sampling: 'Sampling',
        camera: 'Camera',
        viewData: 'View Data'
      }
    }
  },
  dataSearchFrom: {
    titleText: 'Data Search',
    form: {
      all: 'All',
      stationType: {
        label: 'Type Of Station',
        placeholder: 'Select Type Of Station'
      },
      stationAuto: {
        label: 'Station Name',
        placeholder: 'Select Station Name'
      },
      fromDate: {
        label: 'Start',
        placeholder: 'Select Starting Date'
      },
      toDate: {
        label: 'End',
        placeholder: 'Select Ending date'
      },
      measuringList: {
        label: 'Parameters',
        placeholder: 'Select Parameter',
        require: 'Choose At Least 1 Parameter'
      },
      isExceeded: {
        label: 'Only Exceeded Data'
      },
      operator: {
        label: 'Operator'
      },
      value: {
        label: 'Value'
      },
      type: {
        label: 'Type Of Report'
      },
      advanced: {
        label: 'Advanced',
        reset: 'Reset'
      }
    },
    table: {
      emptyText: 'There Are No Records To Display',
      receivedAt: 'Received At',
      all: 'All'
    },
    tab: {
      data: 'Data',
      chart: 'Chart',
      exportExcel: 'Export To Excel',
      statusExport: 'Exporting...'
    },
    analyze: {
      max: 'Max',
      maxTime: 'Max Time',
      min: 'Min',
      minTime: 'Min Time',
      avg: 'Average',
      parameters: 'Parameters'
    }
  },
  avgSearchFrom: {
    titleText: 'AVG Search',
    form: {
      stationType: {
        label: 'Type Of Station',
        placeholder: 'Select Type Of Station',
        error: 'Please Choose Type Of Station'
      },
      stationAuto: {
        label: 'Station Name',
        placeholder: 'Select Station Name',
        error: 'Please Choose Station Name'
      },
      fromDate: {
        label: 'Start',
        placeholder: 'Select Starting Date'
      },
      toDate: {
        label: 'End',
        placeholder: 'Select Ending Date'
      },
      measuringList: {
        label: 'Parameters',
        placeholder: 'Select Parameter',
        require: 'Choose At Least 1 Parameter'
      },
      isExceeded: {
        label: 'Only Exceeded Data'
      },
      operator: {
        label: 'Operator'
      },
      value: {
        label: 'Value'
      },
      type: {
        label: 'Type Of Report',
        error: 'Please Choose Type Of Report'
      },
      advanced: {
        label: 'Advanced'
      }
    },
    table: {
      receivedAt: 'Received At',
      all: 'All',
      emptyText: 'There Are No Records To Display'
    },
    selectTimeRange: {
      minute: 'Minute',
      hour: 'Hour',
      day: 'Day',
      month: 'Month'
    },
    tab: {
      data: 'Data',
      chart: 'Chart',
      exportExcel: 'Export To Excel',
      statusExport: 'Exporting ...'
    }
  },
  measuringManager: {
    list: {
      title: 'Parameters'
    },
    create: {
      success: 'Add Parameter Successfully',
      keyExisted: 'Parameter Is Already Existed'
    },
    edit: {
      label: 'Edit',
      success: 'Update Parameter Successfully'
    },
    delete: {
      label: 'Delete'
    },
    form: {
      key: {
        label: 'Code',
        placeholder: 'Input Parameter Code',
        error: 'Please Input Parameter Code'
      },
      name: {
        label: 'Name',
        placeholder: 'Input Parameter Name',
        error: 'Please Input Parameter Name'
      },
      unit: {
        label: 'Unit',
        placeholder: 'Input Unit Of Parameter'
      },
      numericalOrder: {
        label: 'Numerical Order',
        placeholder: 'Numerical Order'
      },
      action: {
        label: 'Action'
      },
      error: 'Error'
    }
  },
  stationTypeManager: {
    list: {
      title: 'Type Of Station'
    },
    create: {
      label: 'Create',
      success: 'Add New Type Of Station Successfully',
      keyExisted: 'Type Of Station Is Already Existed'
    },
    edit: {
      label: 'Edit',
      success: 'Update Type Of Station Successfully'
    },
    delete: {
      label: 'Delete'
    },
    form: {
      key: {
        label: 'Code',
        placeholder: 'Input Code of Type Of Station',
        error: 'Please Input Code of Type Of Station'
      },
      name: {
        label: 'Name',
        placeholder: 'Input Name of Type Of Station',
        error: 'Please Name of Type Of Station'
      },
      icon: {
        label: 'Icon',
        placeholder: 'Choose Icon'
      },
      auto: {
        label: 'Auto'
      },
      action: {
        label: 'Action'
      },
      error: 'Error',
      color: {
        label: 'Color',
        placeholder: 'Choose Color'
      },
      numericalOrder: {
        label: 'Numerical Order',
        placeholder: 'Numerical Order'
      }
    }
  },
  stationAutoManager: {
    list: {
      title: 'Station Name',
      ftpInfo: 'FTP Info',
      ftpFile: 'FTP File'
    },
    create: {
      label: 'Create',
      success: 'Add Station Name Successfully',
      keyExisted: 'Station Name Is Already Existed'
    },
    edit: {
      label: 'Edit',
      success: 'Update Station Name Successfully'
    },
    delete: {
      label: 'Delete',
      require: 'Please Confirm To Delete'
    },
    add: {
      label: 'Add'
    },
    addMeasuring: {
      label: 'Add Measuring',
      error: 'Measuring have at least 1'
    },
    form: {
      key: {
        label: 'Code',
        placeholder: 'Input Code Of Station Name',
        error: 'Please Input Code Of Station Name'
      },
      name: {
        label: 'Name',
        placeholder: 'Input Station Name',
        error: 'Please input Station Name'
      },
      stationType: {
        label: 'Type',
        placeholder: 'Input Type Of Station',
        error: 'Please Choose Type Of Station'
      },
      address: {
        label: 'Address',
        placeholder: 'Address'
      },
      long: {
        label: 'Longitude',
        placeholder: 'Input longitude',
        error: 'Please Input Longitude'
      },
      lat: {
        label: 'Latitude',
        placeholder: 'Input Latitude',
        error: 'Please Input Latitude'
      },
      emails: {
        label: 'Email Address',
        placeholder: 'Input Email Address',
        error: 'Please Input Email Address'
      },
      phones: {
        label: 'Phone Number',
        placeholder: 'Input Phone Number',
        error: 'Please Input Phone Number'
      },
      measuringKey: {
        label: 'Parameter code',
        placeholder: 'Input Parameter Code',
        error: 'Please Input Parameter Code'
      },
      measuringName: {
        label: 'Parameter Name',
        placeholder: 'Input Parameter Name',
        error: 'Please Input Parameter Name'
      },
      measuringUnit: {
        label: 'Parameter Unit',
        placeholder: 'Input Parameter Unit',
        error: 'Please Input Parameter Unit'
      },
      measuringMinLimit: {
        label: 'Min Limit',
        placeholder: 'Input Min Limit',
        error: 'Please Input Min Limit'
      },
      measuringMaxLimit: {
        label: 'Max Limit',
        placeholder: 'Input Max Limit',
        error: 'Please Input Max Limit'
      },
      options: {
        isAllowWarning: 'Allow Warning',
        isAllowRemote: 'Allow Remote'
      },
      mapLocation: {
        label: 'mapLocation',
        placeholder: 'mapLocation'
      },
      error: 'Error',
      require: 'Please Enter Value'
    },
    config: {
      label: 'Config',
      fileName: {
        label: 'File Name',
        placeholder: 'File Name'
      },
      path: {
        label: 'Path',
        placeholder: 'Path'
      },
      measuringSrc: {
        label: 'Source Of Parameter',
        placeholder: 'Source Of Parameter',
        error: 'Please Enter Source Of Parameter'
      },
      measuringDes: {
        label: 'Destination Of Parameter',
        placeholder: 'Destination Of Parameter',
        error: 'Please Enter Destination Of Parameter'
      },
      ratio: {
        label: 'Ratio',
        placeholder: 'Ratio',
        error: 'Please Enter Ratio'
      },
      message: {
        success: 'Update station auto config success!',
        error: 'Update station auto config fail!'
      }
    },
    options: {
      allowSendWarning: {
        label: 'Allow Send Warning',
        placeholder: 'Allow Send Warning'
      },
      allowSampling: {
        label: 'Allow Sampling',
        placeholder: 'Allow Sampling'
      },
      apiAddress: {
        label: 'API Address',
        placeholder: 'Allow API Address'
      },
      allowCamera: {
        label: 'Allow Camera',
        placeholder: 'Allow Camera',
        add: 'Add'
      },
      name: {
        label: 'Name',
        placeholder: 'Name'
      },
      RTSP: {
        label: 'RTSP URL',
        placeholder: 'RTSP URL',
        error: 'Please enter RTSP URL'
      }
    },
    header: {
      option: 'Options',
      dataLogger: 'DataLogger'
    },
    upload: {
      label: 'Upload',
      error: 'Upload Image Failed'
    },
    uploadFile: {
      label: 'Upload File',
      error: 'File Upload Failed.',
      success: 'File Uploaded Successfully',
      status: {
        uploading: 'Uploading ...',
        finish: 'Done'
      }
    },
    ftpFile: {
      fileName: 'File Name',
      kind: 'Kind',
      modifiedDate: 'Modified Date',
      size: 'Size',
      NOT_EXIST_FTP:
        'This station does not have FTP directory or FTP directory has changed',
      buttonCreateFTP: 'Click me to create FTP Folder',
      createFTPSuccess: 'Create FTP folder successfully',
      headerName: 'FTP Info: ',
      addressLabel: 'Address ftp:',
      usernameLabel: 'Username:',
      passwordLabel: 'Password:'
    }
  },
  parameterManager: {
    breadcrumb: {
      base: 'Parameters',
      create: 'Create',
      edit: 'Edit'
    }
  },
  cameraManager: {
    breadcrumb: {
      camera: 'Camera'
    }
  },
  userManager: {
    breadcrumb: {
      list: 'Users',
      create: 'Create',
      edit: 'Edit'
    },
    form: {
      email: {
        label: 'Email Address',
        placeholder: 'Email Address',
        error: 'The Input Email Address Is Not Valid'
      },
      password: {
        label: 'Password',
        placeholder: 'Password'
      },
      confirmPassword: {
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        message: 'Please Confirm Your Password!'
      },
      firstName: {
        label: 'First Name',
        placeholder: 'First Name'
      },
      lastName: {
        label: 'Last Name',
        placeholder: 'Last Name'
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
        label: 'Admin Role'
      }
    },
    list: {
      enableAccount: 'Enable Account',
      disableAccount: 'Disable Account',
      confirmEnableAccount: 'Do You Want To {0} These Accounts?',
      enable: 'Enable',
      disable: 'Disable',
      deactivate: 'Deactivate',
      action: 'Action',
      email: 'Email',
      country: 'Country',
      login: 'Login',
      status: 'Status',
      roleAssign: 'Assign Role',
      createdAt: 'Created At'
    },
    roleAssign: {
      role: 'Role',
      name: 'Name',
      success: 'Update Rule User Successfully',
      error: 'Update Rule User Failed',
      address: 'Address',
      isAdmin: 'Admin Role'
    }
  },
  roleManager: {
    breadcrumb: {
      list: 'Roles',
      create: 'Create',
      edit: 'Edit'
    },
    form: {
      name: {
        label: 'Name',
        placeholder: 'Input Name',
        error: 'Please Input Name'
      },
      description: {
        label: 'Description',
        placeholder: 'Input Description',
        error: 'Please Input Description'
      }
    }
  },
  subscriptionStatus: {
    breadcrumb: {
      base: 'Subscription Status'
    },
    Renew: 'Renew',
    renewAt: 'Renew At',
    currentSubscription: 'Current Subscription',
    subscriptionHistory: 'Subscription History',
    expiredAt: 'Expired At',
    totalUsers: 'Total No. Of Users',
    totalStation: 'Total No. Of Station'
  },
  profileUser: {
    title: 'User Profile',
    success: 'Change Information Successfully',
    viewProfile: 'View Profile',
    security: 'Security',
    logOut: 'Log Out',
    changePassword: 'Change Password',
    avatar: 'Avatar',
    email: 'Email',
    LastName: 'Last Name',
    FirstName: 'First Name',
    Birthday: 'Birthday',
    Phone: 'Phone',
    upload: 'Upload',
    imageUpload: {
      success: 'Done',
      error: 'Upload Image Failed'
    }
  },
  changePassword: {
    breadcrumb: {
      changePassword: 'Change password',
      profileUser: 'User profile',
      security: 'Security Setting'
    },
    form: {
      oldPassword: {
        label: 'Current Password',
        error: 'Please Input Your Current Password'
      },
      newPassword: {
        label: 'New Password',
        error: 'Please Input New Password'
      },
      newPasswordConfirmation: {
        label: 'Password Confirmation',
        error: 'Please Input New Password One More Time',
        error1: 'Passwords Are Not Matched'
      },
      Success: 'Change Password Successfully',
      compare: 'Two Passwords That You Enter Is Inconsistent',
      savePassword: 'Save Password'
    }
  },
  resetPassword: {
    key: 'I Forgot My Password',
    key2:
      "Enter your email address and we'll send you an email with instruction to reset your password",
    key3: 'Reset Password',
    key4: 'Resend Code',
    key5: 'Confirm',
    key6: 'Send Code'
  },
  security: {
    label: 'Two-Factor Authentication',
    note:
      'If you turn on Two-Factor Authentication feature, The system will send the verification code to your email address every time you sign in',
    success: 'Success'
  },
  login: {
    title: 'Login',
    twoFactorAlert:
      'Two-Factor Authentication - Your verification code will be sent to {{=it.email}}!',
    form: {
      email: {
        label: 'Email Address',
        placeholder: 'user@example.com'
      },
      password: {
        label: 'Password',
        placeholder: '********'
      },
      twoFactor: {
        label: 'Verification Code',
        placeholder: 'xxxx'
      },
      buttonLogin: 'Login',
      buttonTwoFactor: 'Verify'
    },
    errors: {
      emailOrPasswordIncorrect: 'The email or password is incorrect.',
      accountDisable: 'Your account is disabled',
      accountNotActivated: 'Your account is not activated.',
      codeNotEqual: 'Authentication code is incorrect.',
      organizationNotExist: 'Your organization is not exist.'
    }
  },
  warningLevels: {
    title: 'Warning Levels',
    good: 'Good',
    exceedTendency: 'Tend To Exceed',
    exceedPreparing: 'Almost Exceed',
    exceed: 'Exceeded'
  },
  addon: {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    reset: 'Reset',
    onSave: {
      add: {
        success: 'Added Successfully',
        error: 'Add Error'
      },
      update: {
        success: 'Updated Successfully',
        error: 'Update Error'
      }
    },
    onDelete: {
      success: 'Deleted Successfully',
      error: 'Delete Error'
    },
    search: 'Search',
    error: 'Something Went Wrong!!!'
  },
  success: {
    text: 'Success'
  },
  error: {
    text: 'Errors',
    require: 'Require',
    email: 'Invalid Email Address'
  },
  form: {
    save: 'Save',
    update: 'Update'
  },
  menuApp: {
    dashboard: 'Dashboard',
    monitoring: 'Monitoring',
    camera: 'Camera',
    map: 'Map',
    data: 'Data',
    dataSearch: 'Data Search',
    avgData: 'Average Data',
    manage: 'Manage',
    measuring: 'Parameter',
    stationType: 'Type Of Station',
    stationAuto: 'Station Name',
    adminManagement: 'Administration',
    user: 'User',
    role: 'Role',
    subscription: 'Subscription'
  },
  cameraControl: {
    selectStationPlaceholder: 'Input Station Name'
  }
}

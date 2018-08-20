export default {
  chart: {
    all: 'Tất cả',
    time: 'Thời gian'
  },
  dashboard: {
    good: 'Tốt',
    dataLoss: 'Mất dữ liệu',
    notUse: 'Chưa sử dụng',
    connected: 'Đã kết nối',
    exceeded: 'Vượt ngưỡng',
    exceededPreparing: 'Chuẩn bị vượt',
    exceededTendency: 'Có xu hướng vượt',
    viewInMonitoring: 'Giám sát',
    viewInMap: 'Bản đồ',
    viewMore: 'Xem thêm',
    tableList: {
      name: 'Tên',
      dataStatus: 'Trạng thái dữ liệu'
    }
  },
  monitoring: {
    title: 'Giám sát',
    group: 'Nhóm',
    unGroup: 'Bỏ nhóm',
    sortByStationName: 'Sắp xếp theo tên trạm',
    sortByValues: 'Sắp xếp theo giá trị',
    limit: 'Giới hạn',
    keywordSearch: 'Từ khoá',
    selectGroup: 'Chọn nhóm',
    selectOrder: 'Thứ tự theo',
    selectStationType: 'Loại trạm',
    dataSearch: 'Tìm kiếm dữ liệu',
    viewInMap: 'Bản đồ',
    sampling: 'Lấy mẫu',
    camera: 'Camera',
    lossAt: 'Mất dữ liệu luc',
    notInUse: 'Chưa sử dụng'
  },
  controlStation: {
    text: 'Điều khiển lấy mẫu',
    breadcrumb: {
      trigger: 'Lấy mẫu',
      history: 'Lịch sử lấy mẫu',
      config: 'Cấu hình'
    },
    trigger: {
      triggerSuccess: 'Kích hoạt thành công',
      triggerCancel: 'Huỷ lấy mẫu thành công',
      triggerExceeded: 'Kích hoạt lấy mẫu vượt ngưỡng thành công'
    },
    config: {
      reset: 'Đặt lại thành công',
      success: 'Cấu hình thành công'
    },
    bottle: 'Số chai',
    handMade: 'Thủ công',
    automatic: 'Tự động',
    total: 'Tổng số chai',
    totalHaveTaken: 'Số chai đã lấy',
    amountToGet: 'Số chai cần lấy',
    timer: 'Hẹn giờ',
    date: 'Ngày',
    typeControl: 'Loại điều khiển',
    orderByBottle: 'Sắp xếp theo chai',
    dateTime: 'Ngày giờ',
    content: 'Nội dung',
    email: 'Email',
    tagName: 'Tên thẻ',
    configTotal: 'Cấu hình tổng số chai',
    cycleSampling: 'Chu kỳ lấy mẫu',
    buttonTrigger: 'Kích hoạt',
    cancelTrigger: 'Huỷ kích hoạt',
    triggerExceeded: 'Kích hoạt lấy mẫu vượt thành công',
    cancelTriggerExceeded: 'Huỷ kích hoạt lấy mẫu vượt thành công',
    statusSampling: 'Đang lấy mẫu ...',
    viewMore: 'Xem thêm'
  },
  map: {
    mapOverview: 'Tổng quan bản đồ',
    AQI: 'Chất lượng không khí',
    WQI: 'Chất lượng nước',
    menuRight: {
      good: 'Tốt',
      dataLoss: 'Mất dữ liệu',
      notUse: 'Chưa sử dụng',
      connected: 'Đã kết nối',
      exceeded: 'Vượt ngưỡng',
      exceededPreparing: 'Chuẩn bị vượt',
      exceededTendency: 'Có xu hướng vượt',
      notify: 'Thông báo',
      noData: 'Không có dữ liệu',
      dataStatus: 'Trạng thái dữ liệu',
      stationStatus: 'Trạng thái trạm'
    },
    menuLeft: {
      stationSearch: 'Tìm kiếm trạm'
    },
    dataTable: {
      measuring: 'Thông số',
      value: 'Giá trị',
      unit: 'Đơn vị',
      dataLossAt: 'Mất dữ liệu lúc:',
      dataReceived: 'Có dữ liệu lúc:',
      longitude: 'Kinh độ',
      latitude: 'Vĩ độ',
      address: 'Địa chỉ',
      viewMore: {
        sampling: 'Lấy mẫu',
        camera: 'Camera',
        viewData: 'Hiển thị dữ liệu'
      }
    },
    marker: {
      dataLoss: 'Mất dữ liệu',
      notUse: 'Chưa sử dụng'
    }
  },
  dataSearchFrom: {
    titleText: 'Tìm kiếm dữ liệu',
    form: {
      all: 'Tất cả',
      stationType: {
        label: 'Loại trạm',
        placeholder: 'Chọn loại trạm'
      },
      stationAuto: {
        label: 'Tên trạm',
        placeholder: 'Chọn tên trạm'
      },
      fromDate: {
        label: 'Bắt đầu',
        placeholder: 'Chọn ngày bắt đầu'
      },
      toDate: {
        label: 'Kết thúc',
        placeholder: 'Chọn ngày kết thúc'
      },
      measuringList: {
        label: 'Thông số',
        placeholder: 'Chọn thông số',
        require: 'Chọn ít nhất 1 thông số'
      },
      isExceeded: {
        label: 'Dữ liệu vượt ngưỡng'
      },
      operator: {
        label: 'Phép toán'
      },
      value: {
        label: 'Giá trị'
      },
      type: {
        label: 'Loại báo cáo'
      },
      advanced: {
        label: 'Nâng cao',
        reset: 'Cài đặt lại'
      }
    },
    table: {
      emptyText: 'Không có dữ liệu',
      receivedAt: 'Đã nhận lúc',
      all: 'Tất cả'
    },
    tab: {
      data: 'Dữ liệu',
      chart: 'Biểu đồ',
      exportExcel: 'Xuất dữ liệu excel',
      statusExport: 'Đang xuất dữ liệu...'
    },
    analyze: {
      max: 'Tối đa',
      maxTime: 'Thờ gian tối đa',
      min: 'Tối thiểu',
      minTime: 'Thời gian tối thiểu',
      avg: 'Tần suất',
      parameters: 'Thông số'
    }
  },
  avgSearchFrom: {
    titleText: 'Tìm kiếm tần suất',
    form: {
      stationType: {
        label: 'Loại trạm',
        placeholder: 'Chọn loại trạm',
        error: 'Vui lòng chọn loại trạm'
      },
      stationAuto: {
        label: 'Tên trạm',
        placeholder: 'Chọn tên trạm',
        error: 'Vui lòng chọn tên trạm'
      },
      fromDate: {
        label: 'Bắt đầu',
        placeholder: 'Chọn ngày bắt đầu'
      },
      toDate: {
        label: 'Kết thúc',
        placeholder: 'Chọn ngày kết thúc'
      },
      measuringList: {
        label: 'Thông số',
        placeholder: 'Chọn thông số',
        require: 'Chọn ít nhất 1 thông số'
      },
      isExceeded: {
        label: 'Dữ liệu vượt ngưỡng'
      },
      operator: {
        label: 'Phép toán'
      },
      value: {
        label: 'Giá trị'
      },
      type: {
        label: 'Loại báo cáo',
        error: 'Vui lòng chọn loại báo cáo'
      },
      advanced: {
        label: 'Nâng cao'
      }
    },
    table: {
      receivedAt: 'Đã nhận lúc',
      all: 'Tất cả',
      emptyText: 'Không có giá trị'
    },
    selectTimeRange: {
      minute: 'Phút',
      hour: 'Giờ',
      day: 'Ngày',
      month: 'Tháng'
    },
    tab: {
      data: 'Tháng',
      chart: 'Biểu đồ',
      exportExcel: 'Xuất dữ liệu excel',
      statusExport: 'Đang xuất dữ liệu ...'
    }
  },
  measuringManager: {
    list: {
      title: 'Thông số'
    },
    create: {
      success: 'Thêm thông số thành công',
      keyExisted: 'Thông số đã tồn tại'
    },
    edit: {
      label: 'Sửa',
      success: 'Cập nhật thông số thành công'
    },
    delete: {
      label: 'Xoá'
    },
    form: {
      key: {
        label: 'Mã thông số',
        placeholder: 'Nhập mã thông số',
        error: 'Vui lòng nhập mã thông số'
      },
      name: {
        label: 'Tên thông số',
        placeholder: 'Nhập tên thông số',
        error: 'Vui lòng nhập tên thông số'
      },
      unit: {
        label: 'Đơn vị',
        placeholder: 'Nhập đơn vị'
      },
      numericalOrder: {
        label: 'Số thứ tự',
        placeholder: 'Nhập số thứ tự'
      },
      action: {
        label: 'Hành động'
      },
      error: 'Lỗi'
    }
  },
  stationTypeManager: {
    list: {
      title: 'Loại trạm'
    },
    create: {
      label: 'Tạo mới',
      success: 'Thêm loại trạm mới thành công',
      keyExisted: 'Loại trạm đã tồn tại'
    },
    edit: {
      label: 'Sửa',
      success: 'Cập nhật loại trạm thành công'
    },
    delete: {
      label: 'Xoá'
    },
    form: {
      key: {
        label: 'Mã trạm',
        placeholder: 'Nhập mã trạm',
        error: 'Vui lòng nhập mã trạm'
      },
      name: {
        label: 'Tên',
        placeholder: 'Nhập tên trạm',
        error: 'Vui lòng nhập tên trạm'
      },
      icon: {
        label: 'Biểu tượng',
        placeholder: 'Chọn biểu tượng'
      },
      auto: {
        label: 'Tự động'
      },
      action: {
        label: 'Hành động'
      },
      error: 'Lỗi',
      color: {
        label: 'Màu sắc',
        placeholder: 'Chọn màu'
      },
      numericalOrder: {
        label: 'Số thứ tự',
        placeholder: 'Nhập số thứ tự'
      }
    }
  },
  stationAutoManager: {
    list: {
      title: 'Tên trạm',
      ftpInfo: 'Thông tin FTP',
      ftpFile: 'Tập tin FTP',
      restore: 'Khôi phục',
      remove: 'Loại bỏ',
      action: 'Hành động',
      createdAt: 'Tạo lúc'
    },
    create: {
      label: 'Tạo mới',
      success: 'Thêm tên trạm thành công',
      keyExisted: 'Tên trạm đã tồn tại'
    },
    edit: {
      label: 'Sửa',
      success: 'Cập nhật tên trạm thành công'
    },
    delete: {
      label: 'Xoá',
      require: 'Bạn chắc chắn xoá dữ liệu'
    },
    add: {
      label: 'Thêm'
    },
    addMeasuring: {
      label: 'Thêm thông số',
      error: 'Tối thiểu phải có 1 thông số'
    },
    form: {
      key: {
        label: 'Mã trạm',
        placeholder: 'Nhập mã trạm',
        error: 'Vui lòng nhập mã trạm'
      },
      name: {
        label: 'Tên trạm',
        placeholder: 'Nhập tên trạm',
        error: 'Vui lòng nhập tên trạm'
      },
      stationType: {
        label: 'Loại trạm',
        placeholder: 'Nhập loại trạm',
        error: 'Vui lòng nhập loại trạm'
      },
      address: {
        label: 'Địa chỉ',
        placeholder: 'Nhập địa chỉ'
      },
      long: {
        label: 'Kinh độ',
        placeholder: 'Nhập kinh độ',
        error: 'Vui lòng nhập kinh độ'
      },
      lat: {
        label: 'Vĩ độ',
        placeholder: 'Nhập vĩ độ',
        error: 'Vui lòng nhập vĩ độ'
      },
      emails: {
        label: 'Địa chỉ Email',
        placeholder: 'Nhập địa chỉ Email',
        error: 'Vui lòng nhập địa chỉ Email',
        description:
          'Chú ý: Khi dữ liệu gặp sự cố. Hệ thống sẽ gửi thông tin sự cố thông qua email này.'
      },
      phones: {
        label: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại',
        error: 'Vui lòng nhập số điện thoại'
      },
      measuringKey: {
        label: 'Mã thông số',
        placeholder: 'Nhập mã thông số',
        error: 'Vui lòng nhập mã thông số'
      },
      measuringName: {
        label: 'Tên thông số',
        placeholder: 'Tên thông số',
        error: 'Vui lòng nhập tên thông số'
      },
      measuringUnit: {
        label: 'Đơn vị',
        placeholder: 'Nhập đơn vị của thông số',
        error: 'Vui lòng nhập đơn vị của thông số'
      },
      measuringMinLimit: {
        label: 'Giới hạn tối thiểu',
        placeholder: 'Nhập giới hạn tối thiểu',
        error: 'Vui lòng nhập giới hạn tối thiểu'
      },
      measuringMaxLimit: {
        label: 'Giới hạn tối đa',
        placeholder: 'Nhập giới hạn tôí đa',
        error: 'Vui lòng nhập giới hạn tối đa'
      },
      options: {
        isAllowWarning: 'Cảnh báo',
        isAllowRemote: 'Điều khiển từ xa'
      },
      mapLocation: {
        label: 'Vị trí trên bản đồ',
        placeholder: 'Vị trí trên bản đồ'
      },
      error: 'Lỗi',
      require: 'Vui lòng nhập giá trị'
    },
    config: {
      label: 'Cấu hình',
      fileName: {
        label: 'Tên tập tin',
        placeholder: 'Nhập tên tập tin'
      },
      path: {
        label: 'Đường dẫn tập tin',
        placeholder: 'Nhập đường dẫn tập tin'
      },
      measuringSrc: {
        label: 'Nguồn thông số',
        placeholder: 'Nguồn thông số',
        error: 'Vui lòng nhập nguồn thông số'
      },
      measuringDes: {
        label: 'Đích đến của thông số',
        placeholder: 'Đích đến của thông số',
        error: 'Vui lòng nhập đích đến của thông số'
      },
      ratio: {
        label: 'Tỉ lệ',
        placeholder: 'Nhập tỉ lệ',
        error: 'Vui lòng nhập tỉ lệ'
      },
      message: {
        success: 'Cấu hình trạm thành công!',
        error: 'Cấu hình trạm thất bại!'
      },
      buttonLoadSourceParameter: 'Tải nguồn thông số',
      errorLoadFile: 'Tải tệp từ đường đường dẫn không thành công'
    },
    options: {
      allowSendWarning: {
        label: 'Gửi cảnh báo',
        placeholder: 'Gửi cảnh báo'
      },
      allowSampling: {
        label: 'Lấy mẫu',
        placeholder: 'Lấy mẫu'
      },
      apiAddress: {
        label: 'Địa chỉ API',
        placeholder: 'Địa chỉ API'
      },
      allowCamera: {
        label: 'Xem camera',
        placeholder: 'Xem camera',
        add: 'Thêm'
      },
      name: {
        label: 'Tên',
        placeholder: 'Tên'
      },
      RTSP: {
        label: 'Địa chỉ RTSP',
        placeholder: 'Địa chỉ RTSP',
        error: 'Vui lòng nhập địa chỉ RTSP'
      }
    },
    header: {
      option: 'Tuỳ chọn',
      dataLogger: 'DataLogger'
    },
    upload: {
      label: 'Tải lên',
      error: 'Tải ảnh thất bại'
    },
    uploadFile: {
      label: 'Tải tệp lên',
      error: 'Tải tệp lên thất bại',
      success: 'Tải tên lên thành công',
      status: {
        uploading: 'Đang tải lên ...',
        finish: 'Hoàn thành'
      }
    },
    ftpFile: {
      fileName: 'Tên tập tin',
      kind: 'Loại',
      modifiedDate: 'Sửa ngày',
      size: 'Kích thước',
      NOT_EXIST_FTP:
        'Trạm này không có thư mục FTP hoặc thư mục FTP đã thay đổi',
      buttonCreateFTP: 'Tạo thư mục FTP',
      createFTPSuccess: 'Tạo thư mục FTP thành công',
      headerName: 'Thông tin FTP: ',
      addressLabel: 'Địa chỉ ftp:',
      usernameLabel: 'Tên đăng nhập:',
      passwordLabel: 'Mật khẩu:'
    }
  },
  parameterManager: {
    breadcrumb: {
      base: 'Thông số',
      create: 'Tạo mới',
      edit: 'Chỉnh sửa'
    }
  },
  cameraManager: {
    breadcrumb: {
      camera: 'Camera'
    }
  },
  userManager: {
    breadcrumb: {
      list: 'Danh sách người dùng',
      create: 'Tạo mới',
      edit: 'Chỉnh sửa'
    },
    form: {
      email: {
        label: 'Địa chỉ Email',
        placeholder: 'Địa chỉ Email',
        error: 'Địa chỉ Email không hợp lệ'
      },
      password: {
        label: 'Mật khẩu',
        placeholder: 'Mật khẩu'
      },
      confirmPassword: {
        label: 'Xác nhận mật khẩu',
        placeholder: 'Xác nhận mật khẩu',
        message: 'Vui lòng Xác nhận mật khẩu!'
      },
      firstName: {
        label: 'Tên riêng',
        placeholder: 'Tên riêng'
      },
      lastName: {
        label: 'Họ tên',
        placeholder: 'Họ tên'
      },
      country: {
        label: 'Quốc gia',
        placeholder: 'Chọn quốc gia'
      },
      organization: {
        label: 'Tổ chức',
        placeholder: 'Chọn tổ chức'
      },
      phone: {
        label: 'Số điện thoại',
        placeholder: 'Số điện thoại'
      },
      isAdmin: {
        label: 'Quản trị hệ thống'
      }
    },
    list: {
      enableAccount: 'Kích hoạt tài khoản',
      disableAccount: 'Vô hiệu hoá tài khoản',
      confirmEnableAccount: 'Bạn có muốn {0} tài khoản này không?',
      enable: 'Kích hoạt',
      disable: 'Vô hiệu',
      deactivate: 'Hủy kích hoạt',
      action: 'Hành động',
      email: 'Email',
      country: 'Quốc gia',
      login: 'Đăng nhập',
      status: 'Trạng thái',
      roleAssign: 'Uỷ quyền',
      createdAt: 'Tạo lúc'
    },
    roleAssign: {
      role: 'Tổ chức',
      name: 'Tên tổ chức',
      success: 'Cập nhật qui định thành công',
      error: 'Cập nhật qui định thất bại',
      address: 'Địa chỉ',
      isAdmin: 'Quản trị hệ thống'
    }
  },
  roleManager: {
    breadcrumb: {
      list: 'Tổ chức',
      create: 'Tạo mới',
      edit: 'Chỉnh sửa'
    },
    form: {
      name: {
        label: 'Tên tổ chức',
        placeholder: 'Nhập tên tổ chức',
        error: 'Vui lòng nhập tên tổ chức'
      },
      description: {
        label: 'Mô tả',
        placeholder: 'Nhập mô tả',
        error: 'Vui lòng nhập mô tả'
      }
    }
  },
  subscriptionStatus: {
    breadcrumb: {
      base: 'Tình trạng đăng ký'
    },
    Renew: 'Thay mới',
    renewAt: 'Thay mới lúc',
    currentSubscription: 'Tình trạng hiện tại',
    subscriptionHistory: 'Lịch sử đăng ký',
    expiredAt: 'Hết hạn lúc',
    totalUsers: 'Tổng số người dùng',
    totalStation: 'Tổng số trạm'
  },
  profileUser: {
    title: 'Thông tin người dùng',
    success: 'Thay đổi thông tin thành công',
    viewProfile: 'Hiển thị thông tin',
    security: 'Bảo mật',
    logOut: 'Đăng xuất',
    changePassword: 'Thay đổi mật khẩu',
    avatar: 'Ảnh đại diện',
    email: 'Email',
    LastName: 'Tên riêng',
    FirstName: 'Họ tên',
    Birthday: 'Sinh nhật',
    Phone: 'Số điện thoại',
    upload: 'Tải ảnh lên',
    imageUpload: {
      success: 'Hoàn thành',
      error: 'Tải ảnh lên thất bại'
    }
  },
  changePassword: {
    breadcrumb: {
      changePassword: 'Thay đổi mật khẩu',
      profileUser: 'Thông tin người dùng',
      security: 'Cài đặt bảo mật'
    },
    form: {
      oldPassword: {
        label: 'Mật khẩu hiện tại',
        error: 'Vui lòng nhập mật khẩu hiện tại'
      },
      newPassword: {
        label: 'Mật khẩu mới',
        error: 'Vui lòng nhập mật khẩu mới'
      },
      newPasswordConfirmation: {
        label: 'Xác nhập mật khẩu',
        error: 'Vui lòng nhập mật khẩu mới 1 lần nữa',
        error1: 'Mật khẩu không khớp'
      },
      Success: 'Đổi mật khẩu thành công',
      compare: 'Hai mật khẩu nhập không khớp',
      savePassword: 'Lưu mật khẩu'
    }
  },
  resetPassword: {
    key: 'Quên mật khẩu',
    key2:
      "Nhập email đã đăng ký để đặt lại mật khẩu",
    key3: 'Đặt lại mật khẩu',
    key4: 'Gửi lại mã xác thực',
    key5: 'Xác nhận',
    key6: 'Gửi mã xác thực'
  },
  security: {
    label: 'Bảo mật 2 lớp',
    note:
      'Nếu bật tính năng bảo mật 2 lớp. Hệ thống sẽ yêu cầu nhập mã xác thức đã được gửi vào email',
    success: 'Thành công'
  },
  login: {
    title: 'Đăng nhập',
    twoFactorAlert:
      'Xác thực 2 lớp - Mã xác thực của bạn sẽ được gửi tới {{=it.email}}!',
    form: {
      email: {
        label: 'Địa chỉ Email',
        placeholder: 'user@example.com'
      },
      password: {
        label: 'Mật khẩu',
        placeholder: '********'
      },
      twoFactor: {
        label: 'Mã Xác Thực',
        placeholder: 'xxxx'
      },
      buttonLogin: 'Đăng nhập',
      buttonTwoFactor: 'Xác thực'
    },
    errors: {
      emailOrPasswordIncorrect: 'Emai hoặc mật khẩu không đúng',
      accountDisable: 'Tài khoản của bạn bị vô hiệu hoá',
      accountNotActivated: 'Tài khoản chưa được kích hoạt',
      codeNotEqual: 'Mã xác thực không chính xác',
      organizationNotExist: 'Tổ chức của bạn không tồn tại'
    }
  },
  warningLevels: {
    title: 'Mức cảnh báo',
    good: 'Tốt',
    exceedTendency: 'Có xu hướng vượt',
    exceedPreparing: 'Chuẩn bị vượt',
    exceed: 'Vượt ngưỡng'
  },
  addon: {
    create: 'Tạo mới',
    edit: 'Chỉnh sửa',
    delete: 'Xoá',
    save: 'Lưu',
    reset: 'Đặt lại',
    remove: 'Loại bỏ',
    restore: 'Khôi phục',
    sendRequest: 'Gửi yêu cầu',
    onSave: {
      add: {
        success: 'Thêm thành công',
        error: 'Thêm mới lỗi'
      },
      update: {
        success: 'Cập nhật thành công',
        error: 'Cập nhật thất bại'
      }
    },
    onDelete: {
      success: 'Xoá thành công',
      error: 'Xoá thất bại'
    },
    onRestore: {
      success: 'Khôi phục thành công',
      error: 'Khôi phục thất bại'
    },
    search: 'Tìm kiếm',
    error: 'Đã xảy ra sự cố!!!'
  },
  success: {
    text: 'Thành công'
  },
  error: {
    text: 'Lỗi',
    require: 'Yêu cầu',
    email: 'Địa chỉ Email không hợp lệ'
  },
  form: {
    save: 'Lưu',
    update: 'Cập nhật'
  },
  menuApp: {
    dashboard: 'Bảng điều khiển',
    monitoring: 'Giám sát',
    camera: 'Camera',
    map: 'Bản đồ',
    data: 'Dữ liệu',
    dataSearch: 'Tìm kiếm dữ liệu',
    avgData: 'Tìm kiếm tần số',
    manage: 'Quản lý',
    measuring: 'Thông số',
    stationType: 'Loại trạm',
    stationAuto: 'Tên trạm',
    adminManagement: 'Quản trị',
    user: 'Người dùng',
    role: 'Tổ chức',
    subscription: 'Đăng ký',
    support: 'Hỗ trợ'
  },
  cameraControl: {
    selectStationPlaceholder: 'Nhập tên trạm'
  },
  support: {
    breadcrumb: {
      base: 'Hỗ trợ'
    },
    form: {
      type: {
        label: 'Loại hỗ trợ',
        error: 'Vui lòng chọn loại hỗ trợ'
      },
      title: {
        label: 'Tiêu đề',
        error: 'Vui lòng nhập tiêu đề'
      },
      content: {
        label: 'Nội dung',
        error: 'Vui lòng nhập nội dung'
      },
      upload: {
        label: 'Tải lên',
        buttonLabel: 'Chọn để tải lên',
        error: 'Lỗi'
      }
    }
  }
}

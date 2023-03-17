
export interface UserDto {
          id?: number;
          googleAuthenticatorKey?: null;
          facebookAuthenticatorKey?: null;
          departmentCode?: null;
          userTyp?: null;
          isActive?: null;
          isDeleted?: boolean;
          isEmailConfirmed?: null;
          isLockoutEnabled?: null;
          isPhoneNumberConfirmed?: null;
          username?: null;
          name?: string;
          lastName?: string;
          phoneNumber?: string;
          password?: null;
          passwordResetCode?: null;
          signInToken?: null;
          signInTokenExpireTimeUtc?: Date;
          createTime?: Date;
          emailAddress?: string;
          pictureUrl?: null;
          loginId?: null;
          addressNumber?: null;
          addressSoi?: null;
          message?: null;
          winNumber?: null;
          smsStatus?: null;
          notiStatus?: null;
          loginTyp?: null;
          phoneReg1?: null;
          phoneReg2?: null;
          phoneReg1approveTime?: null;
          phoneReg2approveTime?: null;
          fcmToken?: string;
}

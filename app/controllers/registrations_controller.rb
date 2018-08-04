class RegistrationsController < Devise::RegistrationsController
  private

  def sign_up_params
    params.require(:user).permit(:firstName, :email, :password, :password_confirmation, :lastName, :gender, :age, :bio, :username)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :gender, :bio)
  end
end

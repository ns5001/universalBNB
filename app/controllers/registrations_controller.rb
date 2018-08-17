class RegistrationsController < Devise::RegistrationsController
  private

  # Creates a user acount with the incoming params
  def sign_up_params
    params.require(:user).permit(:firstName, :email, :password, :password_confirmation, :lastName, :gender, :age, :bio, :username)
  end

  # Updates a user with the incoming params
  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :gender, :bio)
  end
end

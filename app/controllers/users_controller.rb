class UsersController < ApplicationController

# No action can happen unless a User is logged in. If a user is not logged in, the login page will be prompted
before_action :authenticate_user!

  # Returns every user object in JSON format
  def index
    respond_to do |format|
      format.json { render json: User.all}
    end
  end

  # returns the current user as an object
  def show
    @user = current_user
  end

  # Attains the user_service object in additon to the seller as an object
  def rate
    @user_service = UserService.find_by(id: params[:id])
    @user = User.find_by(id: @user_service.seller_id)
  end

  # Returns the Services that the User is purchasing but not yet finalized
  def getInProgressBuying
    if current_user
      respond_to do |format|
        format.json {render json: current_user.inProgressBuying}
       end
    end
  end

  # Returns the Services that the User is selling but not yet finalized
  def getInProgressSelling
    if current_user
      respond_to do |format|
        format.json {render json: current_user.inProgressSelling}
       end
    end
  end

  # Updates the User with a new rating and calculates the new sum with that rating
  def update
    @user = User.find_by(id: params[:user][:user_id])
    @user.rating << params[:user][:rating]
    @user.save
    @userService = UserService.find_by(id: params[:user][:user_service_id])
    @userService.rated = true
    sum = 0.00
    @user.rating.each do |rating|
        sum = sum + rating
    end
    @user.average_rating = (sum / @user.rating.count).round(2)
    @user.save
    @userService.save
    redirect_to "/users/show"
  end

  def inbox
  end

  private

  # User params with required parameters
  def user_params
    params.require(:user).permit(:age, :gender, :age, :firstName, :bio, :username, :lastName)
  end

end

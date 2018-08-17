class SessionsController < ApplicationController

    # Signs out the current user
    def destroy
      sign_out current_user
      redirect_to root_path
    end

end

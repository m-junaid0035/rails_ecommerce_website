class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include Pagy::Backend
  helper_method :admin_signed_in?, :current_admin
   def after_sign_in_path_for(resource)
    if resource.is_a?(Admin)
      admin_path  # or whatever path you want for admin
    else
      super  # fallback to default behavior for other users
    end
  end
end

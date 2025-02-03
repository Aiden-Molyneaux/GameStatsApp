class ApplicationController < ActionController::API
  include JwtAuthenticatable
  include CamelCaseRenderable

  private

  def render_error(message, status = :unprocessable_entity)
    render_json({ error: message }, status: status)
  end
end

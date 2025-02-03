module CamelCaseRenderable
  extend ActiveSupport::Concern

  def render_json(object, status: :ok)
    render json: camelize_keys(object), status: status
  end

  private

  def camelize_keys(object)
    case object
    when Array
      object.map { |item| camelize_keys(item) }
    when Hash
      object.transform_keys { |key| key.to_s.camelize(:lower) }
            .transform_values { |value| camelize_keys(value) }
    else
      object
    end
  end
end
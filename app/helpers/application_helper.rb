module ApplicationHelper
    include Pagy::Frontend
end
def nav_link_classes
  "text-gray-700 hover:text-gray-900 transition font-medium"
end

def mobile_link_classes
  "block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-base font-medium transition"
end

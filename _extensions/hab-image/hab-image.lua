local function escape_attr(value)
  local s = tostring(value or "")
  s = s:gsub("&", "&amp;")
  s = s:gsub('"', "&quot;")
  s = s:gsub("<", "&lt;")
  s = s:gsub(">", "&gt;")
  return s
end

return {
  ["hab-image"] = function(args, kwargs, meta)
    local key = pandoc.utils.stringify(args[1] or {})
    if key == "" then
      return pandoc.Null()
    end

    local value = nil
    if meta ~= nil then
      value = meta[key]
    end
    if value == nil and quarto ~= nil and quarto.metadata ~= nil and quarto.metadata.get ~= nil then
      value = quarto.metadata.get(key)
    end
    if value == nil then
      return pandoc.Null()
    end

    local src = pandoc.utils.stringify(value)
    if src == "" then
      return pandoc.Null()
    end

    local alt = ""
    if kwargs ~= nil and kwargs["alt"] ~= nil then
      alt = pandoc.utils.stringify(kwargs["alt"])
    end

    local html = '<figure class="hab-illustration-image"><img src="' ..
      escape_attr(src) .. '" alt="' .. escape_attr(alt) ..
      '" loading="lazy" decoding="async"></figure>'
    return pandoc.RawBlock("html", html)
  end
}

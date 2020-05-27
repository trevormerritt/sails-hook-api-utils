//   ██████╗ ██╗  ██╗    ██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗███████╗███████╗
//  ██╔═══██╗██║ ██╔╝    ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝██╔════╝
//  ██║   ██║█████╔╝     ██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║███████╗█████╗
//  ██║   ██║██╔═██╗     ██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║██╔══╝
//  ╚██████╔╝██║  ██╗    ██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║███████║███████╗
//   ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝
//
//  ┌─┐┬  ┬┌─┐┬─┐┬─┐┬┌┬┐┌─┐  ┌┬┐┌─┐  ┌─┐┌─┐┬┬  ┌─┐  ┌┬┐┌─┐┌─┐┌─┐┬ ┬┬ ┌┬┐
//  │ │└┐┌┘├┤ ├┬┘├┬┘│ ││├┤    ││├┤   └─┐├─┤││  └─┐   ││├┤ ├┤ ├─┤│ ││  │
//  └─┘ └┘ └─┘┴└─┴└─┴─┴┘└─┘  ─┴┘└─┘  └─┘┴ ┴┴┴─┘└─┘  ─┴┘└─┘└  ┴ ┴└─┘┴─┘┴
//  ┌─┐┬┌─  ┬─┐┌─┐┌─┐┌─┐┌─┐┌┐┌┌─┐┌─┐
//  │ │├┴┐  ├┬┘├┤ └─┐├─┘│ ││││└─┐├┤
//  └─┘┴ ┴  ┴└─└─┘└─┘┴  └─┘┘└┘└─┘└─┘
module.exports = function ok(optionalData) {
  // Get access to `req` and `res`
  var req = this.req
  var res = this.res

  const i18n = require("i18n")

  i18n.configure({
    locales: ['en', 'es', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: req.getLocale()
  })

  var payload = {
    success: true,
    message: i18n.__('info.successUnknown'),
    data: {}
  }

  if (req.options.blueprintAction) {
    payload.message = i18n.__('word.action') + ' ' + req.options.blueprintAction + ' ' + i18n.__('info.aboutModel') + ' ' + req.options.model
    payload.data = optionalData

    switch (req.options.blueprintAction) {
      case 'add':     // PUT a /model/:id/relationToMany/:id
      case 'remove':  // DELETE a /model/:id/relationToMany/:id
      case 'replace': // PUT a /model/:id/relationToMany
        payload.message += i18n.__('info.andTheRelation') + req.options.alias
        break
    }
    return res.successResponse({ code: 200, payload: payload })
  } else {
    return res.serverError({ code: 500, payload: payload })
  }
}

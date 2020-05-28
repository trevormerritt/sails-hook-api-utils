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
module.exports = function ok(params) {
  // Get access to `req` and `res`
  var req = this.req
  var res = this.res

  const i18n = require("i18n")

  i18n.configure({
    locales: ['en', 'es', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: req.getLocale()
  })

  // start with an object...
  var payload = {
    code: 200,
    data: {
      success: true,
      message: i18n.__('info.successUnknown'),
      data: {}
    }
  }


  if (req.options.blueprintAction) {
    payload.data.message = i18n.__('word.action') + ' ' + req.options.blueprintAction + ' ' + i18n.__('info.aboutModel') + ' ' + req.options.model
    payload.data.data = params

    switch (req.options.blueprintAction) {
      case 'add':     // PUT a /model/:id/relationToMany/:id
      case 'remove':  // DELETE a /model/:id/relationToMany/:id
      case 'replace': // PUT a /model/:id/relationToMany
        payload.data.message += i18n.__('info.andTheRelation') + req.options.alias
        break
    }
    console.error("*********************************OK_SUCCESS: ", params)
    return res.successResponse({ code: 200, data: payload })
  } else {
    console.error("*********************************OK_ERROR: ", params)
    payload.data.success = false
    return res.serverError({ code: 500, data: payload })
  }
}

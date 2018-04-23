module.exports = function (pb) {

    class PluginSettingsController extends require('../admin_base_controller')(pb) {

        init (context, cb) {
            super.init(context, function () {
                this.pluginRenderingService = this.createService('PluginRenderingService', 'kronos');
                cb(null, true);
            });
        }

        async render (cb) {
            let pluginUid = this.pathVars.id;
            // Ensures that the plugin whose setting we are going to check exists on this site
            this.plugin = await this.pluginService.getPluginBySiteAsync(pluginUid);
            if(!this.plugin) {
                return this.reqHandler.serve404();
            }

            let settings = {};
            try {
                settings = await this.pluginRenderingService.buildSettingsObject(pluginUid);
            } catch (err) {
                return this.reqHandler.serve404();
            }

            this.vueModelService.add({
                navigation: this.AdminNavigationService.get(this.session, ['plugins', 'manage'], this.ls, this.site),
                pills: this.pills,
                settings,
                pluginUid,
                type: 'plugin' // TODO: Eval if we need this
            });

            return this.load('/plugins/plugin_settings', cb);
        }
        get pills() {
           return [
                {
                    name: 'manage_plugins',
                    title: `${this.plugin.name} ${this.ls.g('admin.SETTINGS')}`,
                    icon: 'chevron-left',
                    href: '/admin/plugin'
                }
            ];
        }

        static getRoutes(cb) {
            cb(null, [{
                method: 'get',
                path: "/kronos/plugins/:id/settings",
                auth_required: true,
                inactive_site_access: true,
                access_level: pb.SecurityService.ACCESS_MANAGING_EDITOR,
                content_type: 'text/html'
            }]);
        }
    }

    return PluginSettingsController;
};

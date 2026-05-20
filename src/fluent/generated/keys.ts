import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '687e0285849841ce8a87aecf7d84985d'
                    }
                    br0: {
                        table: 'sys_script'
                        id: 'cb29b9a76eac4985a6ec0b12ef64ecbe'
                        deleted: true
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: '2bf4bc624a1e455d8e24d13685f72688'
                        deleted: true
                    }
                    'headerfooter.au-footer': {
                        table: 'sp_header_footer'
                        id: 'faf671600edd4ded8afc7d3a22f8e126'
                    }
                    'headerfooter.au-header': {
                        table: 'sp_header_footer'
                        id: '0e30b868d116429c99008c81a1f75a0d'
                    }
                    'menu.au-student': {
                        table: 'sp_instance_menu'
                        id: '30a37aba03e74c06b67340f62bc711a8'
                    }
                    'menu.au-student.gethelp': {
                        table: 'sp_rectangle_menu_item'
                        id: '20893d6734e24f87a4d5d3ab3726ef30'
                    }
                    'menu.au-student.home': {
                        table: 'sp_rectangle_menu_item'
                        id: '846ecb321cc74f5f8573bba9a4c77419'
                    }
                    'menu.au-student.knowledge': {
                        table: 'sp_rectangle_menu_item'
                        id: 'e00971495d4f41ecaedface00df3e8d5'
                    }
                    'menu.au-student.myplace': {
                        table: 'sp_rectangle_menu_item'
                        id: 'c9150ab35b194e7784025592b3f30f6f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '9b4934b80e0b4ce18a0467ac789bae90'
                    }
                    'page.home.col.hero': {
                        table: 'sp_column'
                        id: '2785e531ed934a4ba7176ae50bdf5c7c'
                    }
                    'page.home.container.hero': {
                        table: 'sp_container'
                        id: '7d092ae657e049548cac8c0209b9e42a'
                    }
                    'page.home.instance.hero': {
                        table: 'sp_instance'
                        id: 'fe5183e4414c4f10a270e74a11e018b2'
                    }
                    'page.home.row.hero': {
                        table: 'sp_row'
                        id: '56b1b5d56594411fa90c275e3c3ff50f'
                    }
                    'portal.au-student': {
                        table: 'sp_portal'
                        id: 'ad065ce613f849b88f2d7cbe2b8cb8e1'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '8690f3c0fa2249d3a31dbea1ec3c0051'
                        deleted: true
                    }
                    'theme.aotearoa.coastal': {
                        table: 'sp_theme'
                        id: '4e8eaa19ea0b4e7c9dc0b6a9916f5a8c'
                    }
                    'widget.au-hero': {
                        table: 'sp_widget'
                        id: '33e7bec2e13541ab80cf470a63507d23'
                    }
                }
                composite: [
                    {
                        table: 'sp_page'
                        id: 'b419311741894016b8a57525b21cba3f'
                        key: {
                            id: 'home'
                        }
                    },
                ]
            }
        }
    }
}

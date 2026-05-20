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
                    package_json: {
                        table: 'sys_module'
                        id: '9b4934b80e0b4ce18a0467ac789bae90'
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
                }
            }
        }
    }
}

{
  description = "Nix flake for postgresql environment.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    # outputs for each system (x86_64-linux, aarch64-darwin, etc…)
    flake-utils.lib.eachDefaultSystem (system: {

      devShells.default =
        let
          pkgs = import nixpkgs { inherit system; };
          scripts = {
            # define custom script commands here
            startdb = ''
              pg_ctl -D .pg/data -l .pg/log/logs -o "-k `pwd`/.pg/run" -o "-p 55432" start
            '';
            stopdb = ''
              pg_ctl -D .pg/data -l .pg/log/logs -o "-k `pwd`/.pg/run" -o "-p 55432" stop
            '';
            initdb = ''
              mkdir -p .pg/{data,run,log}
              pg_ctl -D .pg/data  init
              echo "host    all        demo03     127.0.0.1/32         scram-sha-256" > .pg/data/pg_hba.conf
              echo "host    all        demo03     ::1/128         scram-sha-256" >> .pg/data/pg_hba.conf
              echo "local   all        all                        trust" >> .pg/data/pg_hba.conf
              echo "host    all        all        127.0.0.1/32    trust" >> .pg/data/pg_hba.conf
              echo "host    all        all        ::1/128         trust" >> .pg/data/pg_hba.conf
              pg_ctl -D .pg/data -l .pg/log/logs -o "-k `pwd`/.pg/run" -o "-p 55432" start
              PGUSER="" createuser -e -d demo03
              PGUSER="" psql -d postgres -c "ALTER ROLE demo03 WITH PASSWORD 'demo03_password';"
              PGUSER="" createdb  -O demo03 -e demo03

              pg_ctl -D .pg/data -l .pg/log/logs -o "-k `pwd`/.pg/run" -o "-p 55432" stop
            '';
          };
          toPackage = name: script: pkgs.writeShellScriptBin name script;
        in

        pkgs.mkShellNoCC {

          packages = with pkgs; [
            (lib.mapAttrsToList toPackage scripts)
            postgresql
            deno
            stdenv.cc.cc.lib
          ];

          shellHook = ''
            export PGHOST="$PWD/.pg/run"
            echo ""
            echo "🚀 Development environment for demo03 loaded!"
            echo ""
            echo "🐘 PostgreSQL DB:"
            echo "🐘   - to initialize the DB: 'initdb'"
            echo "🐘   - to start the DB: 'startdb'"
            echo "🐘   - to stop the DB: 'stopdb'"
            echo "🐘   - DBlogs in .pg/log/"
            echo ""
            echo -n "🦕 "
            deno --version  | head -1 | tail -1
            echo -n "🦕 "
            deno --version  | head -2 | tail -1
            echo -n "🦕 "
            deno --version  | head -3 | tail -1
            echo  "🦕   - to launch the server in dev mode: 'deno run dev'"
            echo  "🦕   - to add a npm package: 'deno install npm:package_name'"
            echo  "🦕   - to remove a npm package: 'deno remove npm:package_name'"
            echo ""
          '';

          PGPORT = "55432";
          PGDATABASE = "demo03";
          PGUSER = "demo03";
        };
    });
}

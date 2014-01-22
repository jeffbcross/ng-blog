module.exports=function(grunt){

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-html2js');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
//grunt.loadNpmTasks('grunt-recess');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.registerTask('build', ['clean:build','less:build', 'cssmin:minify', 'html2js', 'copy','jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'index:build'/*'recess:build', 'jshint:beforeconcat', 'html2js','concat',  'copy', 'clean'*/]);

/**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var dev = this.target === 'build';

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' ),
            dev: dev
          }
        });
      }
    });
  });

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  
  less:{

    build:{
      options:{
        banner: '/* Just testing some stuff. */'
      },
      files:{
        'dist/public/css/app.css':'src/less/app.less',
        

      }
    }
    
  },


  cssmin: {
   minify: {
      expand: true,
      cwd: 'dist/public/css/',
      src: ['*.css', '!*.min.css'],
      dest: 'dist/public/css/min',
      ext: '.min.css'
    }
},


  index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: 'dist/public',
        src: [
          'dist/public/js/jquery.min.js',
          'dist/public/js/angular.js',
          'dist/public/js/angular-ui.js',
          'dist/public/js/angular-ui-router.js',
          'dist/public/js/bootstrap/bootstrap.min.js',
          'dist/public/css/min/*.min.css'
        ]
      },

      /**
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= recess.compile.dest %>'
        ]
      }
    },
  jshint:{

    beforeconcat:{
      options:{
        '-W099':true,
        '-W097':true,
        globals:{
          angular:true,
          $:true,
        },
      },
      
      src:['gruntFile.js','src/app/**/*.js', 'src/common/*.js']
    },
    afterconcat:{
      options:{
        '-W099':true,
        '-W097':true,
        globals:{
          angular:true,
          $: true,
        },

      },
      src:['dist/public/js/angular-app.js']
    }

    

  },


  html2js:{
    options:{
      base: 'src/app'
    },
    build:{
      src: ['src/app/**/*.tpl.html'],
      dest: 'dist/public/templates/templates.js',
      module: 'templates.app'
    }
  },

  concat: {

    js: {
      files:{
        'dist/public/js/angular-app.js': ['src/app/app.js', 'src/app/**/*.js', 'src/common/*.js','dist/public/templates/templates.js']
      }
      
    }
  },
  
  copy:{

    build:{
      files:[
       {expand:true, flatten:true, src:['src/index.html'], dest: 'dist/public', filter: 'isFile'},
        {expand:true, flatten:true, src:['vendor/jquery/jquery.min.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/angular/angular.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/angular-ui-router/release/angular-ui-router.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/bootstrap/dist/js/bootstrap.min.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['src/assets/img/**'], dest:'dist/public/img/', filter: 'isFile'}

      ]
    }
  },
  clean:{
    build:{
      src:['dist/public']
    },
    //since dist is outside of grunt project the force option must be true else error is thrown
    templatesjs:{
      src:['public/templates']
    }
  }
    

});


};

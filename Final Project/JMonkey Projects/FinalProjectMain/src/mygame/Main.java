package mygame;

import com.jme3.app.SimpleApplication;
import com.jme3.bullet.BulletAppState;
import com.jme3.bullet.collision.shapes.CapsuleCollisionShape;
import com.jme3.bullet.collision.shapes.CollisionShape;
import com.jme3.bullet.control.CharacterControl;
import com.jme3.bullet.control.RigidBodyControl;
import com.jme3.bullet.util.CollisionShapeFactory;
import com.jme3.input.KeyInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.light.AmbientLight;
import com.jme3.light.DirectionalLight;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;
import com.jme3.renderer.RenderManager;
import com.jme3.scene.Spatial;

public class Main extends SimpleApplication implements ActionListener {
    private Spatial sceneModel;
    private RigidBodyControl landscape;
    private BulletAppState bulletAppState;
    private CharacterControl player;
    
    // Movement variables
    private boolean left = false;
    private boolean right = false;
    private boolean up = false;
    private boolean down = false;
    
    private Vector3f walkDirection = new Vector3f();

    private Vector3f camDir = new Vector3f();
    private Vector3f camLeft = new Vector3f();
    
    public static void main(String[] args) {
        Main app = new Main();
        app.start();
    }

    @Override
    public void simpleInitApp() {
        bulletAppState = new BulletAppState();
        stateManager.attach(bulletAppState);
        viewPort.setBackgroundColor(new ColorRGBA(0.7f, 0.8f, 1f, 1f));
        
        sceneModel = assetManager.loadModel("Models/groundSand.obj");
        sceneModel.setLocalScale(10.0f);
        flyCam.setMoveSpeed(100);
        setUpKeys();
        setUpLight();

        // We set up collision detection for the scene by creating a
        // compound collision shape and a static RigidBodyControl with mass zero.
        CollisionShape sceneShape = CollisionShapeFactory.createMeshShape(sceneModel);
        landscape = new RigidBodyControl(sceneShape, 0);
        sceneModel.addControl(landscape);
        
        CapsuleCollisionShape capsuleShape = new CapsuleCollisionShape(1.5f, 6f, 1);
        player = new CharacterControl(capsuleShape, 0.05f);
        player.setJumpSpeed(20);
        player.setFallSpeed(30);
        player.setGravity(30);
        player.setPhysicsLocation(new Vector3f(0, 10, 0));
        
            Spatial plainKnife = assetManager.loadModel("Models/Tree.obj");
    
        rootNode.attachChild(plainKnife);
        
        rootNode.attachChild(sceneModel);
        bulletAppState.getPhysicsSpace().add(landscape);
        bulletAppState.getPhysicsSpace().add(player);
    }
    
   /** 
    * We over-write some navigational key mappings here, so we can
    * add physics-controlled walking and jumping.
    * 
    * Removed that icky Dvorak addition. I caught you, Dr. Ricks!
    */
    private void setUpKeys() {
      inputManager.addMapping("Left", new KeyTrigger(KeyInput.KEY_A));
      inputManager.addMapping("Right", new KeyTrigger(KeyInput.KEY_D));
      inputManager.addMapping("Up", new KeyTrigger(KeyInput.KEY_W));
      inputManager.addMapping("Down", new KeyTrigger(KeyInput.KEY_S));
      inputManager.addMapping("Jump", new KeyTrigger(KeyInput.KEY_SPACE));

      inputManager.addListener(this, "Left");
      inputManager.addListener(this, "Right");
      inputManager.addListener(this, "Up");
      inputManager.addListener(this, "Down");
      inputManager.addListener(this, "Jump");
    }
    
    /*
     * Add light to see the scene. Removing this shows only the background color.
     */
    private void setUpLight() {
        AmbientLight al = new AmbientLight();
        al.setColor(ColorRGBA.White.mult(0.1f));
        rootNode.addLight(al);

        DirectionalLight dl = new DirectionalLight();
        dl.setColor(ColorRGBA.White.mult(.5f));
        dl.setDirection(new Vector3f(1, -1, 0).normalizeLocal());
        rootNode.addLight(dl);

        dl = new DirectionalLight();
        dl.setColor(ColorRGBA.Blue.mult(.5f));
        dl.setDirection(new Vector3f(-1, -.2f, .8f).normalizeLocal());
        rootNode.addLight(dl);
    }
    
   /**
    * We check which direction the player is walking by interpreting
    * the camera direction forward (camDir) and to the side (camLeft).
    * The setWalkDirection() command is what lets a physics-controlled player walk.
    * We also make sure here that the camera moves with player.
    */
    @Override
    public void simpleUpdate(float tpf) {
        camDir.set(cam.getDirection());
        camLeft.set(cam.getLeft());
        walkDirection.set(0, 0, 0);
        if (left) {
            walkDirection.addLocal(camLeft);
        }
        if (right) {
            walkDirection.addLocal(camLeft.negate());
        }
        if (up) {
            walkDirection.addLocal(camDir);
        }
        if (down) {
            walkDirection.addLocal(camDir.negate());
        }
        
        //The following allows us to move
        player.setWalkDirection(walkDirection);
        //The following is what keeps us out of the ground
        cam.setLocation(player.getPhysicsLocation());
    }

    @Override
    public void simpleRender(RenderManager rm) {
        //TODO: add render code
    }

    @Override
    public void onAction(String binding, boolean isPressed, float tpf) {
        if (binding.equals("Left")) {
          left = isPressed;
        } else if (binding.equals("Right")) {
          right= isPressed;
        } else if (binding.equals("Up")) {
          up = isPressed;
        } else if (binding.equals("Down")) {
          down = isPressed;
        } else if (binding.equals("Jump")) {
          if (isPressed) {
              player.jump();
          }
        }
    }
}

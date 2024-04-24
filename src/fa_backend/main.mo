import HashMap "mo:base/HashMap"; 
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";


actor {

  let members = HashMap.HashMap<Principal, Text>(0, Principal.equal, Principal.hash);

    public query (message) func greet() : async Text {
    return "Hello, " # Principal.toText(message.caller) # "!";
    
  };


  // public shared func addMember(member : Principal) : async Result<Text, Text> {
  //     switch(members.get(caller)){
  //         case(null){
  //             members.put(caller, member);
  //             return #ok();
  //         };
  //         case(? oldMember){
  //             return #err("Your principal already exists")
  //         };
  //     };
  //     return #err("Not implemented");
  // };



};
